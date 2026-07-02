import { describe, expect, test, vi } from "vitest";

import { MOOD_STATES, SUGGESTIONS } from "../lib/content";
import { getSuggestionsForState, pickSuggestion } from "../lib/suggestions";

describe("suggestions", () => {
  test("contains at least 80 actions across all states", () => {
    expect(SUGGESTIONS.length).toBeGreaterThanOrEqual(80);
  });

  test("contains at least 10 actions for each state", () => {
    for (const state of MOOD_STATES) {
      expect(getSuggestionsForState(state.id).length).toBeGreaterThanOrEqual(10);
    }
  });

  test("returns only actions for the requested state", () => {
    const items = getSuggestionsForState("scroll");

    expect(items.length).toBeGreaterThan(1);
    expect(items.every((item) => item.stateId === "scroll")).toBe(true);
  });

  test("returns actions with the new metadata fields", () => {
    const item = getSuggestionsForState("scroll")[0];

    expect(item).toMatchObject({
      stateId: "scroll",
      difficulty: expect.stringMatching(/easy|medium/),
      type: expect.any(String),
      shortWhy: expect.any(String)
    });
    expect(item.durationMinutes).toBeGreaterThanOrEqual(2);
    expect(item.durationMinutes).toBeLessThanOrEqual(5);
  });

  test("avoids repeating the current suggestion when an alternative exists", () => {
    const first = pickSuggestion("scroll");

    expect(first).not.toBeNull();

    const second = pickSuggestion("scroll", first!.id);

    expect(second).not.toBeNull();
    expect(second!.id).not.toBe(first!.id);
  });

  test("uses random selection inside one state", () => {
    const items = getSuggestionsForState("scroll");
    vi.spyOn(Math, "random").mockReturnValue(0.9);

    const picked = pickSuggestion("scroll");

    expect(picked).toEqual(items[Math.floor(0.9 * items.length)]);
  });

  test("returns null for an unknown state", () => {
    expect(pickSuggestion("unknown")).toBeNull();
  });
});
