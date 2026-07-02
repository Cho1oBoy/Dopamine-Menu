import { afterEach, describe, expect, test, vi } from "vitest";

import { createDefaultAppData } from "../lib/stats";
import { loadAppData, saveAppData } from "../lib/storage";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("storage", () => {
  test("returns default data when nothing is stored", () => {
    const result = loadAppData();

    expect(result.data.stats.completedSessions).toBe(0);
    expect(result.warning).toBeNull();
  });

  test("returns default data with warning when stored JSON is invalid", () => {
    localStorage.setItem("dopamine-menu-data", "{bad json");

    const result = loadAppData();

    expect(result.data.stats.completedSessions).toBe(0);
    expect(result.warning).toBeTruthy();
  });

  test("returns default data with warning when stored data shape is invalid", () => {
    localStorage.setItem("dopamine-menu-data", JSON.stringify({ version: 1 }));

    const result = loadAppData();

    expect(result.data.stats.completedSessions).toBe(0);
    expect(result.warning).toBeTruthy();
  });

  test("normalizes missing journal entries from older stored data", () => {
    localStorage.setItem(
      "dopamine-menu-data",
      JSON.stringify({
        version: 1,
        stats: {
          streak: 1,
          lastCompletedDate: "2026-07-01",
          completedSessions: 1,
          helpedSessions: 1,
          restarts: 0,
          stateCounts: {}
        },
        history: []
      })
    );

    const result = loadAppData();

    expect(result.warning).toBeNull();
    expect(result.data.journalEntries).toEqual([]);
  });

  test("returns warning when save throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    const result = saveAppData(createDefaultAppData());

    expect(result.ok).toBe(false);
    expect(result.warning).toBeTruthy();
  });
});
