import { useState } from "react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

type RelapseScreenProps = {
  onBack: () => void;
  onReturnTwoMinutes: () => void;
  onSaveJournal: (entry: {
    trigger: string;
    feeling: string;
    onePercentBetter: string;
  }) => void;
  onStartOver: () => void;
};

export function RelapseScreen({
  onBack,
  onReturnTwoMinutes,
  onSaveJournal,
  onStartOver
}: RelapseScreenProps) {
  const [showJournal, setShowJournal] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [feeling, setFeeling] = useState("");
  const [onePercentBetter, setOnePercentBetter] = useState("");

  function handleSaveJournal() {
    onSaveJournal({
      trigger,
      feeling,
      onePercentBetter
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Мягкий возврат</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Ты не провалил этот момент
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Срыв не отменяет весь путь. Давай просто спокойно выберем, как вернуться
          к себе отсюда.
        </p>
      </div>

      <Card className="space-y-3 border-[rgba(120,83,66,0.10)] bg-[linear-gradient(180deg,rgba(255,252,249,0.98),rgba(255,244,238,0.94))]">
        <Button onClick={onReturnTwoMinutes}>Вернуться за 2 минуты</Button>
        <Button onClick={() => setShowJournal(true)} variant="secondary">
          Записать, что произошло
        </Button>
        <Button onClick={onStartOver} variant="ghost">
          Начать заново
        </Button>
      </Card>

      {showJournal ? (
        <Card className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
              Небольшая запись без самокритики
            </h3>
            <p className="text-sm leading-6 text-[var(--ink-soft)]">
              Пару честных фраз уже достаточно. Здесь не нужно писать идеально.
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--ink)]">Что меня триггернуло?</span>
            <textarea
              className="min-h-24 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
              onChange={(event) => setTrigger(event.target.value)}
              placeholder="Например: усталость, скука, короткие видео, маркетплейс"
              value={trigger}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--ink)]">Что я чувствовал?</span>
            <textarea
              className="min-h-24 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
              onChange={(event) => setFeeling(event.target.value)}
              placeholder="Пару слов достаточно: тревога, перегруз, пустота, раздражение"
              value={feeling}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--ink)]">
              Что я могу сделать на 1% лучше сейчас?
            </span>
            <textarea
              className="min-h-24 w-full rounded-[1.2rem] border border-[rgba(120,83,66,0.12)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(216,116,90,0.18)]"
              onChange={(event) => setOnePercentBetter(event.target.value)}
              placeholder="Например: убрать телефон, выпить воды, закрыть вкладку, встать"
              value={onePercentBetter}
            />
          </label>

          <div className="space-y-3">
            <Button onClick={handleSaveJournal}>Сохранить и начать заново</Button>
            <Button onClick={() => setShowJournal(false)} variant="ghost">
              Скрыть запись
            </Button>
          </div>
        </Card>
      ) : null}

      <Button onClick={onBack} variant="ghost">
        Назад
      </Button>
    </div>
  );
}
