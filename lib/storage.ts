import { STORAGE_KEY, UI_STORAGE_KEY } from "./constants";
import { normalizeAppData } from "./stats";
import type { AppData } from "./types";

function hasCoreShape(value: unknown): value is Partial<AppData> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Partial<AppData>;

  return (
    typeof data.stats?.completedSessions === "number" &&
    typeof data.stats?.helpedSessions === "number" &&
    Array.isArray(data.history)
  );
}

export function loadAppData(): { data: AppData; warning: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { data: normalizeAppData(undefined), warning: null };
    }

    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        data: normalizeAppData(undefined),
        warning: "Не удалось прочитать старые данные. Прогресс начнётся заново."
      };
    }

    const normalized = normalizeAppData(parsed as Partial<AppData>);

    if (!hasCoreShape(parsed)) {
      const partial = parsed as Partial<AppData>;
      const hasRecoverableData =
        partial.stats !== undefined ||
        Array.isArray(partial.history) ||
        Array.isArray(partial.relapseJournal) ||
        Array.isArray(partial.journalEntries);

      return {
        data: normalized,
        warning: hasRecoverableData ? null : "Не удалось прочитать старые данные. Прогресс начнётся заново."
      };
    }

    return { data: normalized, warning: null };
  } catch {
    return {
      data: normalizeAppData(undefined),
      warning: "Не удалось открыть сохранённый прогресс на этом устройстве."
    };
  }
}

export function saveAppData(data: AppData): { ok: boolean; warning: string | null } {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return { ok: true, warning: null };
  } catch {
    return {
      ok: false,
      warning: "Не удалось сохранить прогресс на этом устройстве."
    };
  }
}

export type PersistedUiState = {
  step: string;
  selectedStateId: string | null;
  selectedSuggestionId: string | null;
  recentSessionId: string | null;
  journalSessionId: string | null;
  timerMode: "suggestion" | "relapse";
  remainingSec: number | null;
  timerEndsAt: string | null;
};

function hasUiShape(value: unknown): value is PersistedUiState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Record<string, unknown>;

  return (
    typeof data.step === "string" &&
    (typeof data.selectedStateId === "string" || data.selectedStateId === null) &&
    (typeof data.selectedSuggestionId === "string" || data.selectedSuggestionId === null) &&
    (typeof data.recentSessionId === "string" || data.recentSessionId === null) &&
    (typeof data.journalSessionId === "string" || data.journalSessionId === null) &&
    (data.timerMode === "suggestion" || data.timerMode === "relapse") &&
    (typeof data.remainingSec === "number" || data.remainingSec === null) &&
    (typeof data.timerEndsAt === "string" || data.timerEndsAt === null)
  );
}

export function loadUiState(): PersistedUiState | null {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    return hasUiShape(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveUiState(data: PersistedUiState) {
  try {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(data));
  } catch {
    return;
  }
}
