import Link from "next/link";

import { Card } from "./ui/card";

const principles = [
  "без стыда",
  "без токсичной мотивации",
  "без обещаний «вылечить»",
  "маленькие действия вместо резких запретов",
  "срывы — часть процесса"
];

const nextSteps = [
  "улучшаю приложение",
  "собираю обратную связь",
  "запускаю антискролл-челлендж",
  "строю продукт для СНГ-комьюнити"
];

const primaryLinkClassName =
  "inline-flex min-h-[3.75rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,var(--accent),var(--accent-strong))] px-6 py-4 text-center text-base font-semibold text-[var(--accent-ink)] shadow-[0_18px_44px_rgba(214,116,90,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2";

const secondaryLinkClassName =
  "inline-flex min-h-[3.75rem] items-center justify-center rounded-[1.4rem] border border-[var(--line)] bg-white/80 px-6 py-4 text-center text-base font-semibold text-[var(--ink)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2";

export function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="space-y-5 sm:space-y-7">
        <header className="flex items-center justify-between gap-4 rounded-[2rem] border border-[rgba(120,83,66,0.08)] bg-white/70 px-4 py-4 shadow-[0_16px_40px_rgba(88,62,53,0.05)] backdrop-blur sm:px-5">
          <Link className="font-semibold tracking-[-0.03em] text-[var(--ink)]" href="/">
            Dopamine Menu
          </Link>
          <div className="flex items-center gap-2">
            <Link
              className="hidden rounded-full px-4 py-3 text-sm font-semibold text-[var(--ink-soft)] transition hover:bg-white sm:inline-flex"
              href="/challenge"
            >
              7-дневный челлендж
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-[var(--ink)] ring-1 ring-[rgba(120,83,66,0.10)]"
              href="/app"
            >
              Открыть приложение
            </Link>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-[rgba(198,113,87,0.15)] bg-[linear-gradient(155deg,rgba(255,252,249,0.98),rgba(255,239,230,0.94))] p-6 sm:p-9">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                Личный проект
              </p>
              <h1 className="max-w-3xl text-[2.55rem] font-bold leading-[0.94] tracking-[-0.065em] text-[var(--ink)] sm:text-[4.6rem]">
                Я делаю Dopamine Menu, потому что сам устал жить на автопилоте
              </h1>
              <p className="max-w-3xl text-[1.05rem] leading-8 text-[var(--ink)]/82 sm:text-xl sm:leading-9">
                Мне 17. Я сам много лет боролся с цифровой зависимостью, скроллом и прокрастинацией. Я не психолог и не врач. Я создаю self-help инструмент, который помогает сделать паузу и выбрать маленькое действие вместо автопилота.
              </p>
            </div>
          </Card>

          <Card className="relative min-h-[20rem] overflow-hidden border-[rgba(47,34,30,0.1)] bg-[var(--ink)] p-6 text-[var(--paper)] sm:p-8">
            <div aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--accent)]/25 blur-3xl" />
            <div className="relative flex h-full min-h-[17rem] flex-col justify-between">
              <p className="max-w-[15rem] text-sm font-semibold uppercase tracking-[0.18em] text-[var(--paper)]/62">
                Создаю то, чем хочу пользоваться сам
              </p>
              <div>
                <p className="text-[8.5rem] font-bold leading-[0.7] tracking-[-0.11em] text-[var(--accent-soft)] sm:text-[11rem]">
                  17
                </p>
                <p className="mt-7 max-w-sm text-base leading-7 text-[var(--paper)]/78">
                  Мне не нужен идеальный контроль. Нужен честный способ вовремя заметить автопилот и вернуться к себе.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Принципы</p>
            <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.05em] text-[var(--ink)] sm:text-[3.2rem]">
              Здесь не нужно быть идеальным
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((principle, index) => (
              <Card key={principle} className="min-h-40 border-[rgba(120,83,66,0.08)] bg-white/84 p-5">
                <div className="flex h-full flex-col justify-between gap-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    0{index + 1}
                  </span>
                  <p className="text-lg font-semibold leading-6 tracking-[-0.03em] text-[var(--ink)]">{principle}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-[rgba(198,113,87,0.14)] bg-[linear-gradient(160deg,rgba(255,250,247,0.98),rgba(255,232,221,0.92))] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Что дальше</p>
            <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--ink)] sm:text-[3.5rem]">
              Строю открыто и по шагам
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
              Сначала слушаю людей и делаю полезнее сам инструмент. Без громких обещаний и искусственной срочности.
            </p>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {nextSteps.map((step) => (
              <Card key={step} className="border-[rgba(120,83,66,0.08)] bg-white/86 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[var(--accent)]" />
                  <p className="text-lg font-semibold leading-7 tracking-[-0.03em] text-[var(--ink)]">{step}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-6">
          <Card className="border-[rgba(47,34,30,0.1)] bg-[var(--ink)] p-6 text-[var(--paper)] sm:p-9">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--paper)]/58">Можно начать сейчас</p>
                <h2 className="text-[2.1rem] font-semibold leading-none tracking-[-0.05em] sm:text-[3.5rem]">
                  Попробуй и скажи честно, что стоит улучшить
                </h2>
                <p className="text-base leading-7 text-[var(--paper)]/72">
                  Приложение бесплатное. Telegram нужен для новостей проекта, обратной связи и первой группы челленджа.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link className={primaryLinkClassName} href="/app">
                  Попробовать приложение
                </Link>
                <a
                  className={secondaryLinkClassName}
                  href="https://t.me/your_username"
                  rel="noreferrer"
                  target="_blank"
                >
                  Присоединиться к Telegram
                </a>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
