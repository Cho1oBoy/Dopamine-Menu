"use client";

import { startTransition, useEffect, useState } from "react";

import { MOOD_STATES } from "../lib/content";
import { pickSuggestion } from "../lib/suggestions";
import {
  createDefaultAppData,
  markSessionHelped,
  recordCompletedSession,
  recordJournalEntry,
  recordRestart
} from "../lib/stats";
import { loadAppData, saveAppData } from "../lib/storage";
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

const RELAPSE_TIMER_TEXT = "Просто вернись в тело: убери экран подальше и побудь с собой две минуты.";

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

  useEffect(() => {
    const result = loadAppData();

    setData(result.data);
    setWarning(result.warning);
  }, []);

  useEffect(() => {
    if (step !== "timer" || remainingSec <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRemainingSec((current) => {
        if (current <= 1) {
          window.clearInterval(timerId);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [remainingSec, step]);

  function moveTo(nextStep: Step) {
    startTransition(() => {
      setStep(nextStep);
    });
  }

  function openRelapseMode() {
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

    setJournalSessionId(recentSessionId);
    moveTo("journal-entry");
  }

  function handleSelectState(state: MoodState) {
    const suggestion = pickSuggestion(state.id);

    if (!suggestion) {
      setWarning("Для этого состояния пока не нашлось действия. Попробуй выбрать другое.");
      return;
    }

    setSelectedState(state);
    setSelectedSuggestion(suggestion);
    moveTo("suggestion");
  }

  function handleAnotherSuggestion() {
    if (!selectedState || !selectedSuggestion) {
      return;
    }

    const nextSuggestion = pickSuggestion(selectedState.id, selectedSuggestion.id);

    if (!nextSuggestion) {
      return;
    }

    setSelectedSuggestion(nextSuggestion);
  }

  function handleStartTimer() {
    if (!selectedSuggestion) {
      return;
    }

    setTimerMode("suggestion");
    setRemainingSec(selectedSuggestion.durationMinutes * 60);
    moveTo("timer");
  }

  function handleCompleteTimer() {
    if (timerMode === "relapse") {
      moveTo("home");
      return;
    }

    if (!selectedState || !selectedSuggestion) {
      return;
    }

    const nextData = recordCompletedSession(data, {
      stateId: selectedState.id,
      stateLabel: selectedState.label,
      suggestionId: selectedSuggestion.id,
      suggestionTitle: selectedSuggestion.title,
      durationSec: selectedSuggestion.durationMinutes * 60,
      nowIso: new Date().toISOString()
    });

    setData(nextData);
    setRecentSessionId(nextData.history[0]?.id ?? null);
    saveWithWarning(nextData, setWarning);
    moveTo("result");
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
    handleRelapseRestart();
    setTimerMode("relapse");
    setRemainingSec(120);
    moveTo("timer");
  }

  function handleRelapseJournalSave(entry: {
    trigger: string;
    feeling: string;
    onePercentBetter: string;
  }) {
    handleRelapseRestart(entry);
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
          onCancel={() => moveTo(timerMode === "relapse" ? "relapse" : "suggestion")}
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
          onRelapse={openRelapseMode}
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
        onOpenFlow={() => moveTo("state")}
        onOpenJournal={openJournal}
        onOpenRelapse={openRelapseMode}
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
