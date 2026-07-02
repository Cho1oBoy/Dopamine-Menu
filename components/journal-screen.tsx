import { useState } from "react";

import type { JournalEntry, MoodState } from "../lib/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type JournalScreenProps = {
  entries: JournalEntry[];
  onBack: () => void;
  states: MoodState[];
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short"
  }).format(new Date(iso));
}

export function JournalScreen({ entries, onBack, states }: JournalScreenProps) {
  const [filter, setFilter] = useState<string>("all");
  const filteredEntries =
    filter === "all" ? entries : entries.filter((entry) => entry.stateId === filter);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Личный журнал</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Журнал наблюдений
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Здесь остаются маленькие заметки о том, что тебя триггерит и что реально помогает вернуться в себя.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              filter === "all"
                ? "bg-[var(--ink)] text-white"
                : "bg-[var(--surface-strong)] text-[var(--ink-soft)] hover:bg-white"
            ].join(" ")}
            onClick={() => setFilter("all")}
            type="button"
          >
            Все
          </button>
          {states.map((state) => (
            <button
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                filter === state.id
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--surface-strong)] text-[var(--ink-soft)] hover:bg-white"
              ].join(" ")}
              key={state.id}
              onClick={() => setFilter(state.id)}
              type="button"
            >
              {state.label}
            </button>
          ))}
        </div>
      </Card>

      {filteredEntries.length > 0 ? (
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <Card className="space-y-3" key={entry.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{entry.stateLabel}</p>
                  <p className="mt-1 text-xs text-[var(--ink-soft)]">{formatDate(entry.createdAt)}</p>
                </div>
                <div className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
                  {entry.moodBefore} → {entry.moodAfter}
                </div>
              </div>

              <div className="space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
                <p>
                  <span className="font-semibold text-[var(--ink)]">Триггер:</span> {entry.trigger || "—"}
                </p>
                <p>
                  <span className="font-semibold text-[var(--ink)]">Что помогло:</span> {entry.whatHelped || "—"}
                </p>
                <p>
                  <span className="font-semibold text-[var(--ink)]">Заметка:</span> {entry.notes || "—"}
                </p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-sm leading-7 text-[var(--ink-soft)]">
            Здесь появятся последние записи, когда ты добавишь первую заметку после завершённой сессии.
          </p>
        </Card>
      )}

      <Button onClick={onBack} variant="secondary">
        Назад
      </Button>
    </div>
  );
}
