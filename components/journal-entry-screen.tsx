import { useState } from "react";

import type { MoodRating, SessionRecord } from "../lib/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type JournalEntryScreenProps = {
  session: SessionRecord;
  onBack: () => void;
  onSave: (entry: {
    trigger: string;
    whatHelped: string;
    moodBefore: MoodRating;
    moodAfter: MoodRating;
    notes: string;
  }) => void;
};

const moodOptions: MoodRating[] = [1, 2, 3, 4, 5];

type MoodPickerProps = {
  label: string;
  value: MoodRating;
  onChange: (value: MoodRating) => void;
};

function MoodPicker({ label, value, onChange }: MoodPickerProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[var(--ink)]">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {moodOptions.map((option) => (
          <button
            className={[
              "rounded-2xl border px-3 py-3 text-sm font-semibold transition",
              value === option
                ? "border-[var(--accent)] bg-[rgba(216,116,90,0.14)] text-[var(--ink)]"
                : "border-[rgba(120,83,66,0.12)] bg-white/80 text-[var(--ink-soft)] hover:bg-white"
            ].join(" ")}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function JournalEntryScreen({ onBack, onSave, session }: JournalEntryScreenProps) {
  const [trigger, setTrigger] = useState("");
  const [whatHelped, setWhatHelped] = useState(session.suggestionTitle);
  const [notes, setNotes] = useState("");
  const [moodBefore, setMoodBefore] = useState<MoodRating>(3);
  const [moodAfter, setMoodAfter] = useState<MoodRating>(3);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Короткая заметка после сессии</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Сохрани пару наблюдений
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Без анализа на пять страниц. Только несколько строк, чтобы лучше понимать свои паттерны.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="rounded-[1.3rem] bg-[var(--surface-strong)] px-4 py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">Состояние</p>
          <p className="mt-2 text-base font-semibold text-[var(--ink)]">{session.stateLabel}</p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">Триггер</span>
          <textarea
            className="min-h-24 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
            onChange={(event) => setTrigger(event.target.value)}
            placeholder="Что подтолкнуло тебя к быстрому дофамину?"
            value={trigger}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">Что помогло</span>
          <textarea
            className="min-h-24 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
            onChange={(event) => setWhatHelped(event.target.value)}
            value={whatHelped}
          />
        </label>

        <MoodPicker label="Настроение до: 1–5" onChange={setMoodBefore} value={moodBefore} />
        <MoodPicker label="Настроение после: 1–5" onChange={setMoodAfter} value={moodAfter} />

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">Свободный текст</span>
          <textarea
            className="min-h-28 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Что заметил про себя в этот момент?"
            value={notes}
          />
        </label>

        <div className="space-y-3">
          <Button
            onClick={() =>
              onSave({
                trigger,
                whatHelped,
                moodBefore,
                moodAfter,
                notes
              })
            }
          >
            Сохранить заметку
          </Button>
          <Button onClick={onBack} variant="ghost">
            Назад
          </Button>
        </div>
      </Card>
    </div>
  );
}
