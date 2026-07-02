import { STORAGE_KEY } from "./constants";
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

    if (!hasCoreShape(parsed)) {
      return {
        data: normalizeAppData(undefined),
        warning: "Не удалось прочитать старые данные. Прогресс начнётся заново."
      };
    }

    return { data: normalizeAppData(parsed), warning: null };
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
