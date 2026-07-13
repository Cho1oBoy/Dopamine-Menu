"use client";

import { startTransition, useEffect, useRef, useState } from "react";

import { trackEvent } from "../lib/analytics";
import { MOOD_STATES } from "../lib/content";
import { getSuggestionById, pickSuggestion } from "../lib/suggestions";
import {
  createDefaultAppData,
  markSessionHelped,
  recordCompletedSession,
  recordJournalEntry,
  recordRestart
} from "../lib/stats";
import {
  loadAppData,
  loadUiState,
  saveAppData,
  saveUiState,
  type PersistedUiState
} from "../lib/storage";
import type { AppData, MoodRating, MoodState, SessionRecord, Suggestion } from "../lib/types";
import { HomeScreen } from "./home-screen";
import { JournalEntryScreen } from "./journal-entry-screen";
import { JournalScreen } from "./journal-screen";
import { RelapseScreen } from "./relapse-screen";
import { ResultScreen } from "./result-screen";
import { StateScreen } from "./state-screen";
import { StatsScreen } from "./stats-screen";
import { SuggestionScreen } from "./suggestion-screen";
import { TimerScreen } from "./timer-screen";

type Step =
  | "home"
  | "state"
  | "suggestion"
  | "timer"
  | "result"
  | "stats"
  | "relapse"
  | "journal"
  | "journal-entry";

type TimerMode = "suggestion" | "relapse";

function saveWithWarning(nextData: AppData, setWarning: (value: string | null) => void) {
  const result = saveAppData(nextData);
  setWarning(result.warning);
}

const RELAPSE_TIMER_TEXT =
  "Просто вернись в тело: убери экран подальше и побудь с собой две минуты.";

export function AppShell() {
  const [step, setStep] = useState<Step>("home");
  const [data, setData] = useState<AppData>(createDefaultAppData);
  const [warning, setWarning] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<MoodState | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [recentSessionId, setRecentSessionId] = useState<string | null>(null);
  const [journalSessionId, setJournalSessionId] = useState<string | null>(null);
  const [remainingSec, setRemainingSec] = useState(0);
  const [timerMode, setTimerMode] = useState<TimerMode>("suggestion");
  const [timerEndsAt, setTimerEndsAt] = useState<string | null>(null);
  const hasHydrated = useRef(false);

  function getRemainingFromSnapshot(nextTimerEndsAt: string | null, nextRemainingSec: number | null) {
    if (nextTimerEndsAt) {
      return Math.max(0, Math.ceil((new Date(nextTimerEndsAt).getTime() - Date.now()) / 1000));
    }

    return Math.max(0, nextRemainingSec ?? 0);
  }

  function buildUiState(overrides: Partial<PersistedUiState> = {}): PersistedUiState {
    return {
      step: overrides.step ?? step,
      selectedStateId:
        "selectedStateId" in overrides ? overrides.selectedStateId ?? null : selectedState?.id ?? null,
      selectedSuggestionId:
        "selectedSuggestionId" in overrides
          ? overrides.selectedSuggestionId ?? null
          : selectedSuggestion?.id ?? null,
      recentSessionId:
        "recentSessionId" in overrides ? overrides.recentSessionId ?? null : recentSessionId,
      journalSessionId:
        "journalSessionId" in overrides ? overrides.journalSessionId ?? null : journalSessionId,
      timerMode: overrides.timerMode ?? timerMode,
      remainingSec: "remainingSec" in overrides ? overrides.remainingSec ?? null : remainingSec,
      timerEndsAt: "timerEndsAt" in overrides ? overrides.timerEndsAt ?? null : timerEndsAt
    };
  }

  function applyUiState(nextUi: PersistedUiState) {
    setStep(nextUi.step as Step);
    setSelectedState(
      nextUi.selectedStateId ? MOOD_STATES.find((item) => item.id === nextUi.selectedStateId) ?? null : null
    );
    setSelectedSuggestion(
      nextUi.selectedSuggestionId ? getSuggestionById(nextUi.selectedSuggestionId) : null
    );
    setRecentSessionId(nextUi.recentSessionId);
    setJournalSessionId(nextUi.journalSessionId);
    setTimerMode(nextUi.timerMode);
    setTimerEndsAt(nextUi.timerEndsAt);
    setRemainingSec(getRemainingFromSnapshot(nextUi.timerEndsAt, nextUi.remainingSec));
  }

  function syncUiState(nextUi: PersistedUiState, historyMode: "push" | "replace" = "replace") {
    saveUiState(nextUi);

    const method = historyMode === "push" ? "pushState" : "replaceState";
    window.history[method]({ dopamineMenuUi: nextUi }, "");
  }

  function moveTo(nextStep: Step, overrides: Partial<PersistedUiState> = {}) {
    const nextUi = buildUiState({ ...overrides, step: nextStep });

    startTransition(() => {
      applyUiState(nextUi);
    });

    if (hasHydrated.current) {
      syncUiState(nextUi, "push");
    }
  }

  useEffect(() => {
    const result = loadAppData();
    const savedUiState = loadUiState();

    setData(result.data);
    setWarning(result.warning);

    if (savedUiState) {
      applyUiState(savedUiState);
      window.history.replaceState({ dopamineMenuUi: savedUiState }, "");
    } else {
      window.history.replaceState({ dopamineMenuUi: buildUiState() }, "");
    }

    const handlePopState = (event: PopStateEvent) => {
      const nextUi = event.state?.dopamineMenuUi as Partial<PersistedUiState> | undefined;

      if (!nextUi?.step || typeof nextUi.step !== "string") {
        return;
      }

      applyUiState(buildUiState(nextUi));
    };

    window.addEventListener("popstate", handlePopState);
    hasHydrated.current = true;

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (step !== "timer" || !timerEndsAt) {
      return;
    }

    const updateRemaining = () => {
      setRemainingSec(getRemainingFromSnapshot(timerEndsAt, null));
    };

    updateRemaining();

    const timerId = window.setInterval(updateRemaining, 1000);

    return () => window.clearInterval(timerId);
  }, [step, timerEndsAt]);

  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    syncUiState(buildUiState(), "replace");
  }, [journalSessionId, recentSessionId, selectedState, selectedSuggestion, step, timerEndsAt, timerMode]);

  function openRelapseMode(source: "home" | "result") {
    trackEvent("slip_mode_opened", { source });
    moveTo("relapse");
  }

  function openJournal() {
    moveTo("journal");
  }

  function openJournalEntry() {
    if (!recentSessionId) {
      moveTo("home");
      return;
    }

    moveTo("journal-entry", { journalSessionId: recentSessionId });
  }

  function handleSelectState(state: MoodState) {
    const suggestion = pickSuggestion(state.id);

    if (!suggestion) {
      setWarning("Для этого состояния пока не нашлось действия. Попробуй выбрать другое.");
      return;
    }

    trackEvent("state_selected", { stateId: state.id });
    trackEvent("action_recommended", {
      stateId: state.id,
      actionId: suggestion.id,
      actionType: suggestion.type,
      durationMinutes: suggestion.durationMinutes
    });

    moveTo("suggestion", {
      selectedStateId: state.id,
      selectedSuggestionId: suggestion.id,
      remainingSec: null,
      timerEndsAt: null,
      timerMode: "suggestion"
    });
  }

  function handleAnotherSuggestion() {
    if (!selectedState || !selectedSuggestion) {
      return;
    }

    const nextSuggestion = pickSuggestion(selectedState.id, selectedSuggestion.id);

    if (!nextSuggestion) {
      return;
    }

    trackEvent("action_recommended", {
      stateId: selectedState.id,
      actionId: nextSuggestion.id,
      actionType: nextSuggestion.type,
      durationMinutes: nextSuggestion.durationMinutes
    });
    setSelectedSuggestion(nextSuggestion);
  }

  function handleStartTimer() {
    if (!selectedSuggestion) {
      return;
    }

    const nextRemainingSec = selectedSuggestion.durationMinutes * 60;
    const endsAt = new Date(Date.now() + nextRemainingSec * 1000).toISOString();

    trackEvent("timer_started", {
      mode: "suggestion",
      durationSeconds: nextRemainingSec,
      stateId: selectedSuggestion.stateId,
      actionId: selectedSuggestion.id
    });

    setTimerMode("suggestion");
    setTimerEndsAt(endsAt);
    setRemainingSec(nextRemainingSec);
    moveTo("timer", {
      timerMode: "suggestion",
      remainingSec: nextRemainingSec,
      timerEndsAt: endsAt
    });
  }

  function handleCompleteTimer() {
    setTimerEndsAt(null);
    setRemainingSec(0);

    if (timerMode === "relapse") {
      trackEvent("session_completed", { mode: "slip", durationSeconds: 120 });
      moveTo("home", { remainingSec: 0, timerEndsAt: null });
      return;
    }

    if (!selectedState || !selectedSuggestion) {
      return;
    }

    trackEvent("session_completed", {
      mode: "suggestion",
      durationSeconds: selectedSuggestion.durationMinutes * 60,
      stateId: selectedState.id,
      actionId: selectedSuggestion.id
    });

    const nextData = recordCompletedSession(data, {
      stateId: selectedState.id,
      stateLabel: selectedState.label,
      suggestionId: selectedSuggestion.id,
      suggestionTitle: selectedSuggestion.title,
      durationSec: selectedSuggestion.durationMinutes * 60,
      nowIso: new Date().toISOString()
    });

    const nextRecentSessionId = nextData.history[0]?.id ?? null;

    setData(nextData);
    setRecentSessionId(nextRecentSessionId);
    saveWithWarning(nextData, setWarning);
    moveTo("result", {
      recentSessionId: nextRecentSessionId,
      remainingSec: 0,
      timerEndsAt: null
    });
  }

  function finishResult(helped: boolean) {
    if (!recentSessionId) {
      moveTo("home");
      return;
    }

    const nextData = markSessionHelped(data, recentSessionId, helped);

    setData(nextData);
    saveWithWarning(nextData, setWarning);
    moveTo("home");
  }

  function handleRelapseRestart(input?: {
    trigger?: string;
    feeling?: string;
    onePercentBetter?: string;
  }) {
    const nextData = recordRestart(data, {
      nowIso: new Date().toISOString(),
      trigger: input?.trigger,
      feeling: input?.feeling,
      onePercentBetter: input?.onePercentBetter
    });

    setData(nextData);
    saveWithWarning(nextData, setWarning);

    return nextData;
  }

  function handleRelapseReturn() {
    const nextRemainingSec = 120;
    const endsAt = new Date(Date.now() + nextRemainingSec * 1000).toISOString();

    handleRelapseRestart();
    trackEvent("timer_started", { mode: "slip", durationSeconds: nextRemainingSec });
    setTimerMode("relapse");
    setTimerEndsAt(endsAt);
    setRemainingSec(nextRemainingSec);
    moveTo("timer", {
      timerMode: "relapse",
      remainingSec: nextRemainingSec,
      timerEndsAt: endsAt
    });
  }

  function handleRelapseJournalSave(entry: {
    trigger: string;
    feeling: string;
    onePercentBetter: string;
  }) {
    handleRelapseRestart(entry);
    trackEvent("journal_entry_created", { kind: "slip" });
    moveTo("state");
  }

  function handleRelapseStartOver() {
    handleRelapseRestart();
    moveTo("state");
  }

  function handleSaveJournal(entry: {
    trigger: string;
    whatHelped: string;
    moodBefore: MoodRating;
    moodAfter: MoodRating;
    notes: string;
  }) {
    const session = data.history.find((item) => item.id === journalSessionId);

    if (!session) {
      moveTo("home");
      return;
    }

    const nextData = recordJournalEntry(data, {
      sessionId: session.id,
      stateId: session.stateId,
      stateLabel: session.stateLabel,
      trigger: entry.trigger,
      whatHelped: entry.whatHelped,
      moodBefore: entry.moodBefore,
      moodAfter: entry.moodAfter,
      notes: entry.notes,
      nowIso: new Date().toISOString()
    });

    trackEvent("journal_entry_created", {
      kind: "session",
      stateId: session.stateId,
      moodBefore: entry.moodBefore,
      moodAfter: entry.moodAfter
    });

    setData(nextData);
    saveWithWarning(nextData, setWarning);
    moveTo("home");
  }

  function renderStep() {
    const journalSession: SessionRecord | null =
      journalSessionId ? data.history.find((item) => item.id === journalSessionId) ?? null : null;

    if (step === "state") {
      return (
        <StateScreen
          onBack={() => moveTo("home")}
          onSelectState={handleSelectState}
          states={MOOD_STATES}
        />
      );
    }

    if (step === "suggestion" && selectedState && selectedSuggestion) {
      return (
        <SuggestionScreen
          onAnother={handleAnotherSuggestion}
          onBack={() => moveTo("state")}
          onStartTimer={handleStartTimer}
          state={selectedState}
          suggestion={selectedSuggestion}
        />
      );
    }

    if (step === "timer") {
      return (
        <TimerScreen
          durationSec={timerMode === "relapse" ? 120 : (selectedSuggestion?.durationMinutes ?? 2) * 60}
          onCancel={() => {
            setTimerEndsAt(null);
            setRemainingSec(0);
            moveTo(timerMode === "relapse" ? "relapse" : "suggestion", {
              remainingSec: 0,
              timerEndsAt: null
            });
          }}
          onComplete={handleCompleteTimer}
          remainingSec={remainingSec}
          title={timerMode === "relapse" ? RELAPSE_TIMER_TEXT : selectedSuggestion?.title ?? ""}
        />
      );
    }

    if (step === "result") {
      return (
        <ResultScreen
          onAddNote={openJournalEntry}
          onAnother={() => {
            handleAnotherSuggestion();
            moveTo("suggestion");
          }}
          onHelpful={() => finishResult(true)}
          onNotHelpful={() => finishResult(false)}
          onRelapse={() => openRelapseMode("result")}
        />
      );
    }

    if (step === "journal-entry" && journalSession) {
      return (
        <JournalEntryScreen
          onBack={() => moveTo("result")}
          onSave={handleSaveJournal}
          session={journalSession}
        />
      );
    }

    if (step === "journal") {
      return <JournalScreen entries={data.journalEntries} onBack={() => moveTo("home")} states={MOOD_STATES} />;
    }

    if (step === "relapse") {
      return (
        <RelapseScreen
          onBack={() => moveTo("home")}
          onReturnTwoMinutes={handleRelapseReturn}
          onSaveJournal={handleRelapseJournalSave}
          onStartOver={handleRelapseStartOver}
        />
      );
    }

    if (step === "stats") {
      return <StatsScreen data={data} onBack={() => moveTo("home")} onOpenJournal={openJournal} />;
    }

    return (
      <HomeScreen
        helpedSessions={data.stats.helpedSessions}
        onOpenFlow={() => {
          trackEvent("app_start_clicked", { source: "app_home" });
          moveTo("state");
        }}
        onOpenJournal={openJournal}
        onOpenRelapse={() => openRelapseMode("home")}
        onOpenStats={() => moveTo("stats")}
        streak={data.stats.streak}
      />
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        {warning ? (
          <div className="mb-4 rounded-[1.4rem] border border-[rgba(216,116,90,0.22)] bg-[rgba(255,249,245,0.95)] px-4 py-3 text-sm leading-6 text-[var(--ink-soft)] shadow-[0_10px_24px_rgba(88,62,53,0.06)]">
            {warning}
          </div>
        ) : null}

        {renderStep()}
      </div>
    </main>
  );
}
