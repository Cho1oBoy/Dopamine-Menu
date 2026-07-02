import { HISTORY_LIMIT, STORAGE_VERSION } from "./constants";
import { daysBetween, toDateKey } from "./date";
import type {
  AppData,
  JournalEntry,
  RecordCompletedInput,
  RecordJournalInput,
  RecordRestartInput,
  RelapseJournalEntry,
  SessionRecord
} from "./types";

const RELAPSE_LIMIT = 12;
const JOURNAL_LIMIT = 24;

export function createDefaultAppData(): AppData {
  return {
    version: STORAGE_VERSION,
    stats: {
      streak: 0,
      lastCompletedDate: null,
      completedSessions: 0,
      helpedSessions: 0,
      restarts: 0,
      stateCounts: {}
    },
    history: [],
    relapseJournal: [],
    journalEntries: []
  };
}

export function normalizeAppData(data: Partial<AppData> | null | undefined): AppData {
  const defaults = createDefaultAppData();

  if (!data || typeof data !== "object") {
    return defaults;
  }

  return {
    version: STORAGE_VERSION,
    stats: {
      streak: typeof data.stats?.streak === "number" ? data.stats.streak : defaults.stats.streak,
      lastCompletedDate:
        typeof data.stats?.lastCompletedDate === "string" || data.stats?.lastCompletedDate === null
          ? data.stats.lastCompletedDate
          : defaults.stats.lastCompletedDate,
      completedSessions:
        typeof data.stats?.completedSessions === "number"
          ? data.stats.completedSessions
          : defaults.stats.completedSessions,
      helpedSessions:
        typeof data.stats?.helpedSessions === "number"
          ? data.stats.helpedSessions
          : defaults.stats.helpedSessions,
      restarts:
        typeof data.stats?.restarts === "number" ? data.stats.restarts : defaults.stats.restarts,
      stateCounts:
        data.stats?.stateCounts && typeof data.stats.stateCounts === "object"
          ? data.stats.stateCounts
          : defaults.stats.stateCounts
    },
    history: Array.isArray(data.history) ? data.history : defaults.history,
    relapseJournal: Array.isArray(data.relapseJournal) ? data.relapseJournal : defaults.relapseJournal,
    journalEntries: Array.isArray(data.journalEntries) ? data.journalEntries : defaults.journalEntries
  };
}

export function recordCompletedSession(data: AppData, input: RecordCompletedInput): AppData {
  const currentDate = toDateKey(input.nowIso);
  const lastCompletedDate = data.stats.lastCompletedDate;
  let streak = 1;

  if (lastCompletedDate === currentDate) {
    streak = data.stats.streak;
  } else if (lastCompletedDate && daysBetween(lastCompletedDate, currentDate) === 1) {
    streak = data.stats.streak + 1;
  }

  const currentCount = data.stats.stateCounts[input.stateId] ?? {
    label: input.stateLabel,
    count: 0
  };

  const session: SessionRecord = {
    id: `${input.stateId}-${input.nowIso}`,
    stateId: input.stateId,
    stateLabel: input.stateLabel,
    suggestionId: input.suggestionId,
    suggestionTitle: input.suggestionTitle,
    durationSec: input.durationSec,
    completed: true,
    helped: false,
    createdAt: input.nowIso
  };

  return {
    ...data,
    version: STORAGE_VERSION,
    stats: {
      ...data.stats,
      streak,
      lastCompletedDate: currentDate,
      completedSessions: data.stats.completedSessions + 1,
      stateCounts: {
        ...data.stats.stateCounts,
        [input.stateId]: {
          label: input.stateLabel,
          count: currentCount.count + 1
        }
      }
    },
    history: [session, ...data.history].slice(0, HISTORY_LIMIT)
  };
}

export function markSessionHelped(data: AppData, sessionId: string, helped: boolean): AppData {
  const target = data.history.find((item) => item.id === sessionId);

  if (!target) {
    return data;
  }

  const wasHelped = target.helped;
  const history = data.history.map((item) =>
    item.id === sessionId ? { ...item, helped } : item
  );

  let helpedSessions = data.stats.helpedSessions;

  if (!wasHelped && helped) {
    helpedSessions += 1;
  } else if (wasHelped && !helped) {
    helpedSessions = Math.max(0, helpedSessions - 1);
  }

  return {
    ...data,
    stats: {
      ...data.stats,
      helpedSessions
    },
    history
  };
}

export function recordRestart(data: AppData, input: RecordRestartInput): AppData {
  const hasJournalContent =
    Boolean(input.trigger?.trim()) ||
    Boolean(input.feeling?.trim()) ||
    Boolean(input.onePercentBetter?.trim());

  const nextJournal: RelapseJournalEntry[] = hasJournalContent
    ? [
        {
          id: `relapse-${input.nowIso}`,
          trigger: input.trigger?.trim() ?? "",
          feeling: input.feeling?.trim() ?? "",
          onePercentBetter: input.onePercentBetter?.trim() ?? "",
          createdAt: input.nowIso
        },
        ...data.relapseJournal
      ].slice(0, RELAPSE_LIMIT)
    : data.relapseJournal;

  return {
    ...data,
    stats: {
      ...data.stats,
      restarts: data.stats.restarts + 1
    },
    relapseJournal: nextJournal
  };
}

export function recordJournalEntry(data: AppData, input: RecordJournalInput): AppData {
  const entry: JournalEntry = {
    id: `journal-${input.nowIso}`,
    sessionId: input.sessionId,
    stateId: input.stateId,
    stateLabel: input.stateLabel,
    trigger: input.trigger.trim(),
    whatHelped: input.whatHelped.trim(),
    moodBefore: input.moodBefore,
    moodAfter: input.moodAfter,
    notes: input.notes.trim(),
    createdAt: input.nowIso
  };

  return {
    ...data,
    journalEntries: [entry, ...data.journalEntries].slice(0, JOURNAL_LIMIT)
  };
}

export function getTopStates(data: AppData) {
  return Object.entries(data.stats.stateCounts)
    .map(([stateId, value]) => ({
      stateId,
      label: value.label,
      count: value.count
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 4);
}
