import Link from "next/link";

import { PageViewTracker } from "./analytics/page-view-tracker";
import { TrackedLink } from "./analytics/tracked-link";
import { Card } from "./ui/card";

const TELEGRAM_URL = "https://t.me/your_username";

const fitPoints = [
  "Просыпаешься и сразу берёшь телефон",
  "Открываешь Shorts или TikTok на 5 минут и пропадаешь на час",
  "Откладываешь учёбу из-за скролла",
  "Чувствуешь, что телефон забирает фокус",
  "Уже удалял приложения, но возвращался обратно"
];

const insidePoints = [
  "Ежедневные задания",
  "Dopamine Menu",
  "Telegram-чат",
  "Трекер прогресса",
  "Режим «Срыв» без стыда",
  "Чеклист на каждый день",
  "Простые правила антискролла"
];

const challengeDays = [
  "Замеряем скролл и триггеры",
  "Убираем утренний автопилот",
  "Собираем личное dopamine menu",
  "Учимся переживать тягу 2 минуты",
  "Настраиваем окружение",
  "Работаем со срывами",
  "Собираем систему на следующие 30 дней"
];

const primaryButtonClassName =
  "inline-flex min-h-[3.75rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,var(--accent),var(--accent-strong))] px-6 py-4 text-center text-base font-semibold tracking-[-0.01em] text-[var(--accent-ink)] shadow-[0_18px_44px_rgba(214,116,90,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(214,116,90,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

function TelegramLink({
  children,
  placement
}: {
  children: string;
  placement: "hero" | "footer";
}) {
  return (
    <TrackedLink
      analyticsEvents={[
        { name: "challenge_cta_clicked", properties: { placement } },
        {
          name: "telegram_clicked",
          properties: { source: placement === "hero" ? "challenge_hero" : "challenge_footer" }
        }
      ]}
      className={primaryButtonClassName}
      href={TELEGRAM_URL}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </TrackedLink>
  );
}

export function ChallengePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <PageViewTracker name="challenge_page_viewed" />
      <div className="space-y-6 sm:space-y-8">
        <header className="flex items-center justify-between gap-4 rounded-[2rem] border border-[rgba(120,83,66,0.08)] bg-white/68 px-4 py-4 shadow-[0_16px_40px_rgba(88,62,53,0.05)] backdrop-blur sm:px-5">
          <Link
            className="rounded-full px-2 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            href="/"
          >
            Dopamine Menu
          </Link>
          <TrackedLink
            analyticsEvents={[
              { name: "app_start_clicked", properties: { source: "challenge_header" } }
            ]}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/86 px-4 text-sm font-semibold text-[var(--ink)] ring-1 ring-[rgba(120,83,66,0.10)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            href="/app"
          >
            Открыть приложение
          </TrackedLink>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
          <Card className="overflow-hidden border-[rgba(198,113,87,0.16)] bg-[linear-gradient(155deg,rgba(255,252,249,0.98),rgba(255,235,225,0.93))] p-6 sm:p-8 lg:p-10">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="inline-flex w-fit rounded-full border border-[rgba(120,83,66,0.08)] bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] sm:text-sm">
                  Первая группа · Telegram
                </div>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-[2.65rem] font-bold leading-[0.92] tracking-[-0.07em] text-[var(--ink)] sm:text-[4.5rem]">
                    7 дней, чтобы вернуть контроль над телефоном
                  </h1>
                  <p className="max-w-2xl text-[1.05rem] leading-8 text-[var(--ink)]/82 sm:text-[1.25rem] sm:leading-9">
                    Без жёстких запретов и токсичной мотивации. Каждый день — маленькое действие,
                    которое помогает меньше залипать и больше жить.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <TelegramLink placement="hero">Хочу участвовать</TelegramLink>
                <p className="max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
                  Откроется Telegram. Оплату пока не принимаем — собираем первую группу.
                </p>
              </div>
            </div>
          </Card>

          <Card className="relative min-h-[25rem] overflow-hidden border-[rgba(120,83,66,0.08)] bg-[var(--ink)] p-6 text-[var(--paper)] sm:p-8">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/35 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                    Антискролл
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Неделя маленьких пауз</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold">
                  7 дней
                </span>
              </div>

              <div aria-hidden="true" className="mx-auto flex w-full max-w-sm items-end justify-center gap-2">
                {[38, 55, 44, 68, 60, 78, 92].map((height, index) => (
                  <div className="flex flex-1 flex-col items-center gap-3" key={height}>
                    <div
                      className="w-full rounded-t-full bg-[linear-gradient(180deg,var(--accent-soft),var(--accent))] opacity-90"
                      style={{ height: `${height * 1.35}px` }}
                    />
                    <span className="text-[0.65rem] font-semibold text-white/55">{index + 1}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
                <p className="text-sm leading-6 text-white/65">Главный ориентир</p>
                <p className="mt-2 text-xl font-semibold leading-7 tracking-[-0.03em]">
                  Не идеальная неделя, а система, к которой можно вернуться
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Для тебя, если</p>
            <h2 className="text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)] sm:text-[3.4rem]">
              Телефон часто решает за тебя, куда уйдёт следующий час
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {fitPoints.map((point, index) => (
              <Card
                className="min-h-[11rem] border-[rgba(120,83,66,0.08)] bg-white/84 p-5"
                key={point}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(216,116,90,0.13)] text-xs font-semibold text-[var(--accent-strong)]">
                    0{index + 1}
                  </span>
                  <p className="text-base font-medium leading-7 tracking-[-0.02em] text-[var(--ink)]">{point}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]" id="inside">
          <Card className="border-[rgba(198,113,87,0.14)] bg-[linear-gradient(160deg,rgba(255,251,248,0.96),rgba(255,238,229,0.92))] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Что будет внутри</p>
            <h2 className="mt-4 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)] sm:text-[3.2rem]">
              Не лекции на два часа. Понятные шаги на каждый день.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
              Всё собрано вокруг практики: заметить автопилот, сделать короткую паузу и настроить среду так,
              чтобы фокус не держался только на силе воли.
            </p>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {insidePoints.map((point, index) => (
              <div
                className="flex min-h-20 items-center gap-4 rounded-[1.6rem] border border-[rgba(120,83,66,0.08)] bg-white/82 px-5 py-4 shadow-[0_16px_36px_rgba(88,62,53,0.05)]"
                key={point}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <p className="font-medium leading-6 text-[var(--ink)]">{point}</p>
                <span className="ml-auto text-xs font-semibold text-[var(--ink-soft)]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Как проходит челлендж</p>
            <h2 className="text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)] sm:text-[3.4rem]">
              Семь дней — от честного замера до своей системы
            </h2>
          </div>

          <Card className="border-[rgba(120,83,66,0.08)] bg-white/84 p-5 sm:p-7">
            <ol className="space-y-1">
              {challengeDays.map((day, index) => (
                <li
                  className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-[var(--line)] py-5 first:pt-1 last:border-0 last:pb-1 sm:grid-cols-[5rem_1fr] sm:items-center"
                  key={day}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-semibold text-[var(--paper)] sm:h-14 sm:w-14">
                    {index + 1}
                  </div>
                  <div className="sm:grid sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[var(--ink-soft)]">День {index + 1}</p>
                    <p className="mt-1 text-lg font-semibold leading-7 tracking-[-0.03em] text-[var(--ink)] sm:mt-0 sm:text-xl">
                      {day}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="border-[rgba(198,113,87,0.17)] bg-[linear-gradient(145deg,var(--accent),var(--accent-strong))] p-6 text-[var(--accent-ink)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Первая группа</p>
            <p className="mt-5 text-[2.35rem] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-[3.7rem]">
              Стартовая цена: 299 ₽
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/80">
              Цена тестовая, пока я собираю первую группу и улучшаю продукт по обратной связи.
            </p>
          </Card>

          <Card className="border-[rgba(120,83,66,0.08)] bg-white/84 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">По-честному</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-[var(--ink)] sm:text-[2.65rem]">
              Без обещаний «новой жизни за неделю»
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
              Я не психолог и не обещаю чудес. Это практичный self-help челлендж для тех, кто хочет меньше жить
              на автопилоте.
            </p>
          </Card>
        </section>

        <section className="pb-6">
          <Card className="overflow-hidden border-[rgba(120,83,66,0.08)] bg-[var(--ink)] p-6 text-center text-[var(--paper)] sm:p-9">
            <div className="mx-auto max-w-3xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-soft)]">Первая группа</p>
              <h2 className="text-[2.35rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-[4rem]">
                Попробуй провести следующую неделю чуть внимательнее к себе
              </h2>
              <p className="mx-auto max-w-xl text-base leading-8 text-white/65">
                Без соревнования за идеальный результат. С заданиями, поддержкой и правом спокойно начать заново.
              </p>
              <div className="flex justify-center pt-1">
                <TelegramLink placement="footer">Вступить в первую группу</TelegramLink>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
