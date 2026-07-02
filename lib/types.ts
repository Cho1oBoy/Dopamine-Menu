export type MoodState = {
  id: string;
  label: string;
};

export type ActionDifficulty = "easy" | "medium";

export type ActionType =
  | "movement"
  | "breathing"
  | "journaling"
  | "environment"
  | "social"
  | "focus"
  | "replacement";

export type Suggestion = {
  id: string;
  stateId: string;
  category: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: ActionDifficulty;
  type: ActionType;
  shortWhy: string;
};

export type SessionRecord = {
  id: string;
  stateId: string;
  stateLabel: string;
  suggestionId: string;
  suggestionTitle: string;
  durationSec: number;
  completed: boolean;
  helped: boolean;
  createdAt: string;
};

export type RelapseJournalEntry = {
  id: string;
  trigger: string;
  feeling: string;
  onePercentBetter: string;
  createdAt: string;
};

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export type JournalEntry = {
  id: string;
  sessionId: string;
  stateId: string;
  stateLabel: string;
  trigger: string;
  whatHelped: string;
  moodBefore: MoodRating;
  moodAfter: MoodRating;
  notes: string;
  createdAt: string;
};

export type AppStats = {
  streak: number;
  lastCompletedDate: string | null;
  completedSessions: number;
  helpedSessions: number;
  restarts: number;
  stateCounts: Record<string, { label: string; count: number }>;
};

export type AppData = {
  version: number;
  stats: AppStats;
  history: SessionRecord[];
  relapseJournal: RelapseJournalEntry[];
  journalEntries: JournalEntry[];
};

export type RecordCompletedInput = {
  stateId: string;
  stateLabel: string;
  suggestionId: string;
  suggestionTitle: string;
  durationSec: number;
  nowIso: string;
};

export type RecordRestartInput = {
  nowIso: string;
  trigger?: string;
  feeling?: string;
  onePercentBetter?: string;
};

export type RecordJournalInput = {
  sessionId: string;
  stateId: string;
  stateLabel: string;
  trigger: string;
  whatHelped: string;
  moodBefore: MoodRating;
  moodAfter: MoodRating;
  notes: string;
  nowIso: string;
};
