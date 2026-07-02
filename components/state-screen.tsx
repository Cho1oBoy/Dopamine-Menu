import type { MoodState } from "../lib/types";
import { Button } from "./ui/button";

type StateScreenProps = {
  states: MoodState[];
  onBack: () => void;
  onSelectState: (state: MoodState) => void;
};

const stateHints: Record<string, string> = {
  bored: "хочется хоть какого-то стимула",
  anxious: "внутри всё слишком громко",
  tired: "сил мало, тянет в простое",
  scroll: "палец уже тянется к ленте",
  stuck: "сложно начать даже маленький шаг",
  "craving-food": "хочется быстрого утешения",
  "impulse-buy": "хочется купить ради всплеска",
  lonely: "хочется почувствовать связь"
};

export function StateScreen({ states, onBack, onSelectState }: StateScreenProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Шаг 1 из 4</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Что сейчас ближе всего?
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Просто выбери состояние, не объясняя его правильно. Мы найдём короткий
          и спокойный следующий шаг.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {states.map((state) => (
          <button
            className="group rounded-[1.8rem] border border-[rgba(120,83,66,0.10)] bg-[rgba(255,250,246,0.92)] px-5 py-5 text-left shadow-[0_14px_34px_rgba(83,61,52,0.06)] transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            key={state.id}
            onClick={() => onSelectState(state)}
            type="button"
          >
            <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
              {state.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
              {stateHints[state.id]}
            </p>
          </button>
        ))}
      </div>

      <Button onClick={onBack} variant="ghost">
        Назад
      </Button>
    </div>
  );
}
