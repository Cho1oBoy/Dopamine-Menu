import { getTopStates } from "../lib/stats";
import type { AppData } from "../lib/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type StatsScreenProps = {
  data: AppData;
  onBack: () => void;
  onOpenJournal: () => void;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short"
  }).format(new Date(iso));
}

export function StatsScreen({ data, onBack, onOpenJournal }: StatsScreenProps) {
  const topStates = getTopStates(data);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Твоя мягкая статистика</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Ты уже умеешь нажимать паузу
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Здесь нет оценок. Только заметки о том, сколько раз ты выбрал себя вместо импульса и сколько раз
          сумел мягко вернуться после срыва.
        </p>
      </div>

      <Card className="space-y-5 border-[rgba(120,83,66,0.10)] bg-[linear-gradient(150deg,rgba(255,252,249,0.98),rgba(255,241,233,0.92))] p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">сегодняшний ориентир</p>
          <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
            Даже одна маленькая пауза уже считается
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.5rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">серия</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">{data.stats.streak}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              спасённых сессий
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">
              {data.stats.helpedSessions}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">завершено</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">
              {data.stats.completedSessions}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">restarts</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">
              {data.stats.restarts}
            </p>
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">Частые состояния</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
            Это не слабости, а повторяющиеся моменты, где тебе особенно нужна пауза.
          </p>
        </div>

        {topStates.length > 0 ? (
          <div className="space-y-3">
            {topStates.map((item) => (
              <div
                className="flex items-center justify-between gap-4 rounded-[1.2rem] bg-[var(--surface-strong)] px-4 py-3"
                key={item.stateId}
              >
                <p className="text-sm text-[var(--ink)]">{item.label}</p>
                <p className="text-sm font-semibold text-[var(--ink-soft)]">{item.count}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--ink-soft)]">
            История появится после первых завершённых сессий.
          </p>
        )}
      </Card>

      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Последние записи после срыва
          </h3>
          <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
            Это не отчёт о провале, а подсказки для следующего мягкого возврата.
          </p>
        </div>

        {data.relapseJournal.length > 0 ? (
          <div className="space-y-3">
            {data.relapseJournal.slice(0, 3).map((entry) => (
              <div className="rounded-[1.35rem] bg-[var(--surface-strong)] px-4 py-4" key={entry.id}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">Запись о возврате</p>
                  <p className="text-xs text-[var(--ink-soft)]">{formatDate(entry.createdAt)}</p>
                </div>
                <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
                  <p>
                    <span className="font-semibold text-[var(--ink)]">Триггер:</span> {entry.trigger || "—"}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--ink)]">Чувства:</span> {entry.feeling || "—"}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--ink)]">1% лучше сейчас:</span>{" "}
                    {entry.onePercentBetter || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--ink-soft)]">
            Когда ты сделаешь первую мягкую запись после срыва, она появится здесь.
          </p>
        )}
      </Card>

      <Card className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">Последние сессии</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
            Небольшие доказательства того, что ты уже умеешь прерывать импульс.
          </p>
        </div>

        {data.history.length > 0 ? (
          <div className="space-y-3">
            {data.history.slice(0, 6).map((item) => (
              <div className="rounded-[1.35rem] bg-[var(--surface-strong)] px-4 py-4" key={item.id}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">{item.stateLabel}</p>
                  <p className="text-xs text-[var(--ink-soft)]">{formatDate(item.createdAt)}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{item.suggestionTitle}</p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  {item.helped ? "помогло" : "сессия завершена"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[var(--ink-soft)]">
            Здесь появится история последних пауз, которые ты успел сделать для себя.
          </p>
        )}
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onBack} variant="secondary">
          Назад
        </Button>
        <Button onClick={onOpenJournal} variant="ghost">
          Открыть журнал
        </Button>
      </div>
    </div>
  );
}
