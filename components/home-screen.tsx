import BlurText from "./blur-text";
import SplitText from "./split-text";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type HomeScreenProps = {
  helpedSessions: number;
  streak: number;
  onOpenFlow: () => void;
  onOpenJournal: () => void;
  onOpenRelapse: () => void;
  onOpenStats: () => void;
};

export function HomeScreen({
  helpedSessions,
  streak,
  onOpenFlow,
  onOpenJournal,
  onOpenRelapse,
  onOpenStats
}: HomeScreenProps) {
  return (
    <div className="space-y-6 sm:space-y-7">
      <div className="space-y-4 sm:space-y-5">
        <div className="inline-flex w-fit rounded-full border border-[rgba(120,83,66,0.10)] bg-white/72 px-4 py-2 shadow-[0_10px_24px_rgba(88,62,53,0.05)]">
          <SplitText
            className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] sm:text-[0.98rem]"
            delay={45}
            duration={0.7}
            from={{ opacity: 0, y: 18 }}
            rootMargin="-40px"
            splitType="words"
            tag="p"
            text="Без геройства, без осуждения"
            textAlign="left"
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <div className="space-y-4">
          <h1 className="max-w-xl text-[2.8rem] font-bold leading-[0.92] tracking-[-0.065em] text-[var(--ink)] sm:text-[4.5rem]">
            <BlurText
              animateBy="words"
              as="span"
              delay={140}
              direction="top"
              stepDuration={0.38}
              text="Dopamine Menu"
            />
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-8 text-[var(--ink)]/84 sm:text-[1.3rem] sm:leading-9">
            Когда тянет в быстрый дофамин, это приложение помогает не сорваться в
            автопилот, а выбрать короткое действие, которое возвращает тебя в
            себя.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden border-[rgba(198,113,87,0.16)] bg-[linear-gradient(145deg,rgba(255,252,249,0.98),rgba(255,240,232,0.92))] p-0 shadow-[0_28px_70px_rgba(120,83,66,0.10)]">
        <div className="space-y-6 p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr] sm:items-start">
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--ink-soft)] ring-1 ring-[rgba(120,83,66,0.08)]">
                Когда хочется сорваться в быстрый дофамин
              </div>
              <div className="space-y-3">
                <h2 className="text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] sm:text-[2.45rem]">
                  Нажми паузу до того,
                  <br />
                  как откроется следующая вкладка
                </h2>
                <p className="max-w-md text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
                  За 2-5 минут ты можешь сбить импульс, вернуть себе фокус и не
                  уходить в бесконечный скролл, сладкое или импульсивные покупки.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className="rounded-[1.45rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">серия</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">{streak}</p>
              </div>
              <div className="rounded-[1.45rem] bg-white/74 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  спасённых сессий
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[var(--ink)]">
                  {helpedSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="min-h-[4.75rem] text-base shadow-[0_20px_50px_rgba(211,106,82,0.30)] sm:text-lg"
              onClick={onOpenFlow}
            >
              Меня тянет залипнуть
            </Button>
            <Button onClick={onOpenRelapse} variant="secondary">
              Я сорвался
            </Button>
          </div>

          <Card className="border-[rgba(120,83,66,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,247,242,0.92))] p-5 shadow-[0_18px_44px_rgba(88,62,53,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[var(--ink-soft)]">Спасённых сессий</p>
                <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.07em] text-[var(--ink)] sm:text-[3rem]">
                  {helpedSessions}
                </p>
              </div>

              <div className="rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--ink)] ring-1 ring-[rgba(120,83,66,0.10)]">
                Серия {streak}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
                Ты уже умеешь прерывать импульс
              </p>
              <p className="text-sm leading-6 text-[var(--ink-soft)]">
                Каждая спасённая сессия — это момент, когда ты выбрал себя, а не
                автопилот.
              </p>
            </div>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-6 text-[var(--ink-soft)]">
              Это не тест на силу воли. Это быстрый, добрый маршрут обратно к
              себе.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="sm:w-auto sm:px-5 sm:py-3" onClick={onOpenStats} variant="ghost">
                Открыть статистику
              </Button>
              <Button className="sm:w-auto sm:px-5 sm:py-3" onClick={onOpenJournal} variant="ghost">
                Открыть журнал
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
