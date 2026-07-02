import type { MoodState, Suggestion } from "../lib/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type SuggestionScreenProps = {
  state: MoodState;
  suggestion: Suggestion;
  onBack: () => void;
  onAnother: () => void;
  onStartTimer: () => void;
};

const difficultyLabels = {
  easy: "easy",
  medium: "medium"
} as const;

const typeLabels = {
  movement: "movement",
  breathing: "breathing",
  journaling: "journaling",
  environment: "environment",
  social: "social",
  focus: "focus",
  replacement: "replacement"
} as const;

export function SuggestionScreen({
  state,
  suggestion,
  onAnother,
  onBack,
  onStartTimer
}: SuggestionScreenProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Шаг 2 из 4</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Твой маленький план спасения
        </h2>
        <p className="text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Сейчас у тебя состояние <span className="font-semibold text-[var(--ink)]">{state.label}</span>. Не нужно
          решать всё сразу, только этот один шаг.
        </p>
      </div>

      <Card className="space-y-5 border-[rgba(120,83,66,0.10)] bg-[linear-gradient(180deg,rgba(255,251,248,0.98),rgba(255,245,239,0.95))] p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(120,83,66,0.08)]">
            {suggestion.durationMinutes} мин
          </span>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(120,83,66,0.08)]">
            {difficultyLabels[suggestion.difficulty]}
          </span>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(120,83,66,0.08)]">
            {typeLabels[suggestion.type]}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">сделай сейчас</p>
          <h3 className="text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
            {suggestion.title}
          </h3>
          <p className="text-sm leading-7 text-[var(--ink-soft)] sm:text-base">{suggestion.description}</p>
        </div>

        <div className="rounded-[1.4rem] bg-white/72 p-4 ring-1 ring-[rgba(120,83,66,0.08)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">почему это может помочь</p>
          <p className="mt-2 text-sm leading-7 text-[var(--ink)] sm:text-base">{suggestion.shortWhy}</p>
        </div>
      </Card>

      <div className="space-y-3">
        <Button onClick={onStartTimer}>Запустить таймер</Button>
        <Button onClick={onAnother} variant="secondary">
          Дай другое действие
        </Button>
        <Button onClick={onBack} variant="ghost">
          Назад к состояниям
        </Button>
      </div>
    </div>
  );
}
