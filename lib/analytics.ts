export const ANALYTICS_BROWSER_EVENT = "dopamine-menu:analytics";

export const ANALYTICS_EVENTS = [
  "landing_view",
  "app_start_clicked",
  "state_selected",
  "action_recommended",
  "timer_started",
  "session_completed",
  "slip_mode_opened",
  "journal_entry_created",
  "challenge_page_viewed",
  "challenge_cta_clicked",
  "telegram_clicked"
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsEventMap = {
  landing_view: Record<string, never>;
  app_start_clicked: {
    source:
      | "landing_header"
      | "landing_hero"
      | "landing_footer"
      | "challenge_header"
      | "app_home";
  };
  state_selected: { stateId: string };
  action_recommended: {
    stateId: string;
    actionId: string;
    actionType: string;
    durationMinutes: number;
  };
  timer_started: {
    mode: "suggestion" | "slip";
    durationSeconds: number;
    stateId?: string;
    actionId?: string;
  };
  session_completed: {
    mode: "suggestion" | "slip";
    durationSeconds: number;
    stateId?: string;
    actionId?: string;
  };
  slip_mode_opened: { source: "home" | "result" };
  journal_entry_created: {
    kind: "session" | "slip";
    stateId?: string;
    moodBefore?: number;
    moodAfter?: number;
  };
  challenge_page_viewed: Record<string, never>;
  challenge_cta_clicked: { placement: "hero" | "footer" };
  telegram_clicked: { source: "challenge_hero" | "challenge_footer" };
};

export type AnalyticsEvent = {
  [Name in AnalyticsEventName]: {
    name: Name;
    properties: AnalyticsEventMap[Name];
    timestamp: string;
  };
}[AnalyticsEventName];

export type AnalyticsEventInput = {
  [Name in AnalyticsEventName]: {
    name: Name;
    properties: AnalyticsEventMap[Name];
  };
}[AnalyticsEventName];

const ALLOWED_PROPERTY_KEYS: {
  [Name in AnalyticsEventName]: readonly (keyof AnalyticsEventMap[Name])[];
} = {
  landing_view: [],
  app_start_clicked: ["source"],
  state_selected: ["stateId"],
  action_recommended: ["stateId", "actionId", "actionType", "durationMinutes"],
  timer_started: ["mode", "durationSeconds", "stateId", "actionId"],
  session_completed: ["mode", "durationSeconds", "stateId", "actionId"],
  slip_mode_opened: ["source"],
  journal_entry_created: ["kind", "stateId", "moodBefore", "moodAfter"],
  challenge_page_viewed: [],
  challenge_cta_clicked: ["placement"],
  telegram_clicked: ["source"]
};

declare global {
  interface Window {
    dopamineMenuAnalytics?: {
      track: (event: AnalyticsEvent) => void;
    };
  }
}

type AnalyticsAdapter = (event: AnalyticsEvent) => void;

let activeAdapter: AnalyticsAdapter | null = null;
const pendingEvents: AnalyticsEvent[] = [];

function sendToAdapter(adapter: AnalyticsAdapter, event: AnalyticsEvent) {
  try {
    adapter(event);
  } catch {
    // Analytics must never interrupt the user's flow.
  }
}

export function setAnalyticsAdapter(adapter: AnalyticsAdapter) {
  activeAdapter = adapter;

  pendingEvents.splice(0).forEach((event) => sendToAdapter(adapter, event));

  return () => {
    if (activeAdapter === adapter) {
      activeAdapter = null;
    }
  };
}

function sanitizeProperties<Name extends AnalyticsEventName>(
  name: Name,
  properties: AnalyticsEventMap[Name]
): AnalyticsEventMap[Name] {
  const input = properties as Record<string, unknown>;
  const sanitized: Record<string, string | number | boolean> = {};

  for (const key of ALLOWED_PROPERTY_KEYS[name] as readonly string[]) {
    const value = input[key];

    if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      (typeof value === "number" && Number.isFinite(value))
    ) {
      sanitized[key] = value;
    }
  }

  return sanitized as AnalyticsEventMap[Name];
}

export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  properties: AnalyticsEventMap[Name]
) {
  if (typeof window === "undefined") {
    return;
  }

  const event = {
    name,
    properties: sanitizeProperties(name, properties),
    timestamp: new Date().toISOString()
  } as AnalyticsEvent;

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event.name, event.properties);
  }

  if (activeAdapter) {
    sendToAdapter(activeAdapter, event);
  } else if (window.dopamineMenuAnalytics?.track) {
    sendToAdapter(window.dopamineMenuAnalytics.track, event);
  } else {
    pendingEvents.push(event);
  }

  try {
    window.dispatchEvent(new CustomEvent(ANALYTICS_BROWSER_EVENT, { detail: event }));
  } catch {
    // Older embedded browsers may not support CustomEvent.
  }
}

export function trackAnalyticsInput(event: AnalyticsEventInput) {
  trackEvent(event.name, event.properties as never);
}
