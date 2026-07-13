import { describe, expect, test, vi } from "vitest";

import {
  ANALYTICS_BROWSER_EVENT,
  ANALYTICS_EVENTS,
  setAnalyticsAdapter,
  trackEvent,
  type AnalyticsEvent
} from "../lib/analytics";

describe("analytics", () => {
  test("exposes the complete product event catalog", () => {
    expect(ANALYTICS_EVENTS).toEqual([
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
    ]);
  });

  test("dispatches only allowlisted properties", () => {
    const events: AnalyticsEvent[] = [];
    const listener = (event: Event) => {
      events.push((event as CustomEvent<AnalyticsEvent>).detail);
    };

    window.addEventListener(ANALYTICS_BROWSER_EVENT, listener);

    trackEvent(
      "journal_entry_created",
      {
        kind: "session",
        stateId: "scroll",
        moodBefore: 2,
        moodAfter: 4,
        notes: "private journal text",
        trigger: "private trigger"
      } as never
    );

    window.removeEventListener(ANALYTICS_BROWSER_EVENT, listener);

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      name: "journal_entry_created",
      properties: {
        kind: "session",
        stateId: "scroll",
        moodBefore: 2,
        moodAfter: 4
      }
    });
    expect(events[0].properties).not.toHaveProperty("notes");
    expect(events[0].properties).not.toHaveProperty("trigger");
  });

  test("is safe when rendered without browser APIs", () => {
    vi.stubGlobal("window", undefined);

    expect(() => trackEvent("landing_view", {})).not.toThrow();

    vi.unstubAllGlobals();
  });

  test("flushes events that happened before a provider was ready", () => {
    const adapter = vi.fn();

    trackEvent("landing_view", {});
    const disconnect = setAnalyticsAdapter(adapter);

    expect(adapter).toHaveBeenCalledWith(
      expect.objectContaining({ name: "landing_view", properties: {} })
    );

    disconnect();
  });
});
