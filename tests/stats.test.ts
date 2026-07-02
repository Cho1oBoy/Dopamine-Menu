import { describe, expect, test } from "vitest";

import {
  createDefaultAppData,
  getTopStates,
  markSessionHelped,
  recordCompletedSession,
  recordJournalEntry,
  recordRestart
} from "../lib/stats";

describe("stats", () => {
  test("increments completed sessions and streak on first completion", () => {
    const next = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    expect(next.stats.completedSessions).toBe(1);
    expect(next.stats.streak).toBe(1);
    expect(next.history).toHaveLength(1);
    expect(next.history[0].completed).toBe(true);
  });

  test("extends streak on the next day and resets after a gap", () => {
    const first = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const second = recordCompletedSession(first, {
      stateId: "stuck",
      stateLabel: "Не могу начать задачу",
      suggestionId: "stuck-two-min",
      suggestionTitle: "Открой задачу и сделай только первые две минуты",
      durationSec: 120,
      nowIso: "2026-07-02T10:00:00.000Z"
    });

    const third = recordCompletedSession(second, {
      stateId: "bored",
      stateLabel: "Скучно",
      suggestionId: "bored-walk",
      suggestionTitle: "Пройдись по комнате и назови 5 предметов вокруг",
      durationSec: 120,
      nowIso: "2026-07-05T10:00:00.000Z"
    });

    expect(second.stats.streak).toBe(2);
    expect(third.stats.streak).toBe(1);
  });

  test("increments helped sessions when a session is marked helpful", () => {
    const completed = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const next = markSessionHelped(completed, completed.history[0].id, true);

    expect(next.stats.helpedSessions).toBe(1);
    expect(next.history[0].helped).toBe(true);
  });

  test("does not double count helped when marked twice", () => {
    const completed = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const helped = markSessionHelped(completed, completed.history[0].id, true);
    const second = markSessionHelped(helped, helped.history[0].id, true);

    expect(second.stats.helpedSessions).toBe(1);
  });

  test("stores restart entries without resetting streak", () => {
    const completed = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const restarted = recordRestart(completed, {
      trigger: "Открыл короткие видео",
      feeling: "Устал и хотел отключиться",
      onePercentBetter: "Сначала закрыть приложение и сделать три вдоха",
      nowIso: "2026-07-01T10:10:00.000Z"
    });

    expect(restarted.stats.restarts).toBe(1);
    expect(restarted.stats.streak).toBe(1);
    expect(restarted.relapseJournal).toHaveLength(1);
    expect(restarted.relapseJournal[0].trigger).toBe("Открыл короткие видео");
  });

  test("stores a journal entry linked to a completed session", () => {
    const completed = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const next = recordJournalEntry(completed, {
      sessionId: completed.history[0].id,
      stateId: completed.history[0].stateId,
      stateLabel: completed.history[0].stateLabel,
      trigger: "Открыл короткие видео",
      whatHelped: completed.history[0].suggestionTitle,
      moodBefore: 2,
      moodAfter: 4,
      notes: "Стало спокойнее после таймера",
      nowIso: "2026-07-01T10:05:00.000Z"
    });

    expect(next.journalEntries).toHaveLength(1);
    expect(next.journalEntries[0]).toMatchObject({
      sessionId: completed.history[0].id,
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      trigger: "Открыл короткие видео",
      moodBefore: 2,
      moodAfter: 4
    });
    expect(next.stats.completedSessions).toBe(1);
    expect(next.stats.helpedSessions).toBe(0);
  });

  test("returns top states in descending order", () => {
    const afterScroll = recordCompletedSession(createDefaultAppData(), {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-breath",
      suggestionTitle: "Убери телефон на край стола и сделай 10 медленных вдохов",
      durationSec: 120,
      nowIso: "2026-07-01T10:00:00.000Z"
    });

    const afterMoreScroll = recordCompletedSession(afterScroll, {
      stateId: "scroll",
      stateLabel: "Хочу скроллить",
      suggestionId: "scroll-water",
      suggestionTitle: "Встань и медленно выпей стакан воды",
      durationSec: 180,
      nowIso: "2026-07-02T10:00:00.000Z"
    });

    const afterAnxious = recordCompletedSession(afterMoreScroll, {
      stateId: "anxious",
      stateLabel: "Тревожно",
      suggestionId: "anxious-ground",
      suggestionTitle: "Найди глазами 5 спокойных вещей вокруг",
      durationSec: 180,
      nowIso: "2026-07-03T10:00:00.000Z"
    });

    expect(getTopStates(afterAnxious)[0]).toEqual({
      stateId: "scroll",
      label: "Хочу скроллить",
      count: 2
    });
  });
});
