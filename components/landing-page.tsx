import Link from "next/link";

import BlurText from "./blur-text";
import ShinyText from "./shiny-text";
import SplitText from "./split-text";
import { Card } from "./ui/card";

const problemPoints = [
  {
    id: "doomscroll",
    label: "Бесконечный скролл, который съедает вечер",
    illustrationLabel: "Иллюстрация: бесконечный скролл"
  },
  {
    id: "reels",
    label: "Shorts, TikTok и Reels вместо пары минут отдыха",
    illustrationLabel: "Иллюстрация: shorts и reels"
  },
  {
    id: "study",
    label: "Прокрастинация перед учёбой, экзаменом или задачей",
    illustrationLabel: "Иллюстрация: прокрастинация перед учёбой"
  },
  {
    id: "morning-phone",
    label: "Утренний телефонный автопилот до того, как начался день",
    illustrationLabel: "Иллюстрация: утренний телефонный автопилот"
  },
  {
    id: "impulse",
    label: "Импульсивные покупки, сладкое и фастфуд на эмоциях",
    illustrationLabel: "Иллюстрация: импульсивные покупки и еда"
  }
] as const;

const audience = [
  "Школьники",
  "Студенты",
  "Те, кто готовится к вузу или экзаменам",
  "Те, кто устал от скролла",
  "Те, кто хочет вернуть фокус"
];

const features = [
  {
    title: "Dopamine Menu",
    text: "Выбираешь состояние и не тратишь силы на то, чтобы самому придумать, что делать дальше."
  },
  {
    title: "Таймер",
    text: "2–5 минут на паузу, чтобы переключиться без перегруза и без больших обещаний самому себе."
  },
  {
    title: "Режим «Срыв»",
    text: "Если уже сорвался, приложение не давит, а помогает спокойно вернуться и начать заново."
  },
  {
    title: "Дневник",
    text: "Короткие заметки помогают заметить, что именно тебя триггерит и что реально срабатывает."
  },
  {
    title: "Статистика",
    text: "Видишь прогресс без стыда: серия, спасённые сессии, рестарты и последние записи."
  },
  {
    title: "База здоровых действий",
    text: "Внутри уже есть десятки коротких действий для скуки, тревоги, усталости, скролла и импульсов."
  }
];

const navItems = [
  { href: "#problem", label: "Проблема" },
  { href: "#how-it-works", label: "Как это работает" },
  { href: "#inside", label: "Что внутри" },
  { href: "#who", label: "Для кого" }
];

function ProblemIllustration({
  id,
  label
}: {
  id: (typeof problemPoints)[number]["id"];
  label: string;
}) {
  if (id === "doomscroll") {
    return (
      <svg aria-label={label} className="h-24 w-24" role="img" viewBox="0 0 96 96">
        <rect x="22" y="10" width="52" height="76" rx="16" fill="#f3ded5" />
        <rect x="30" y="22" width="36" height="6" rx="3" fill="#2f221e" opacity="0.18" />
        <rect x="30" y="34" width="28" height="6" rx="3" fill="#d8745a" opacity="0.75" />
        <rect x="30" y="46" width="36" height="6" rx="3" fill="#2f221e" opacity="0.12" />
        <rect x="30" y="58" width="24" height="6" rx="3" fill="#2f221e" opacity="0.12" />
        <path d="M62 71c5 0 9-4 9-9" fill="none" stroke="#d8745a" strokeLinecap="round" strokeWidth="4" />
        <path
          d="M66 66l5-4 3 6"
          fill="none"
          stroke="#d8745a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    );
  }

  if (id === "reels") {
    return (
      <svg aria-label={label} className="h-24 w-24" role="img" viewBox="0 0 96 96">
        <rect x="12" y="16" width="72" height="64" rx="18" fill="#f7e7df" />
        <rect x="20" y="24" width="56" height="12" rx="6" fill="#f2d3c5" />
        <circle cx="31" cy="54" r="12" fill="#d8745a" opacity="0.9" />
        <path d="M28 48l11 6-11 6V48z" fill="#fff8f4" />
        <rect x="48" y="46" width="22" height="6" rx="3" fill="#2f221e" opacity="0.18" />
        <rect x="48" y="57" width="16" height="6" rx="3" fill="#2f221e" opacity="0.12" />
      </svg>
    );
  }

  if (id === "study") {
    return (
      <svg aria-label={label} className="h-24 w-24" role="img" viewBox="0 0 96 96">
        <rect x="18" y="14" width="60" height="68" rx="14" fill="#f5e5dc" />
        <rect x="28" y="26" width="18" height="18" rx="5" fill="#d8745a" opacity="0.82" />
        <path
          d="M31 35l4 4 8-10"
          fill="none"
          stroke="#fff8f4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
        <rect x="52" y="28" width="16" height="5" rx="2.5" fill="#2f221e" opacity="0.15" />
        <rect x="52" y="38" width="12" height="5" rx="2.5" fill="#2f221e" opacity="0.1" />
        <rect x="28" y="54" width="40" height="5" rx="2.5" fill="#2f221e" opacity="0.12" />
        <rect x="28" y="64" width="32" height="5" rx="2.5" fill="#2f221e" opacity="0.1" />
      </svg>
    );
  }

  if (id === "morning-phone") {
    return (
      <svg aria-label={label} className="h-24 w-24" role="img" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="30" fill="#f6e6dd" />
        <circle cx="48" cy="48" r="18" fill="#fff8f4" stroke="#d8745a" strokeWidth="4" />
        <path
          d="M48 36v14l9 5"
          fill="none"
          stroke="#2f221e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path d="M64 26l5-5" fill="none" stroke="#d8745a" strokeLinecap="round" strokeWidth="4" />
        <path d="M27 69l5-5" fill="none" stroke="#d8745a" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg aria-label={label} className="h-24 w-24" role="img" viewBox="0 0 96 96">
      <rect x="18" y="24" width="34" height="42" rx="12" fill="#f4ddd3" />
      <path
        d="M26 37c0-6 4-10 9-10s9 4 9 10"
        fill="none"
        stroke="#d8745a"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path d="M29 47h12" fill="none" stroke="#2f221e" opacity="0.18" strokeLinecap="round" strokeWidth="4" />
      <path d="M29 56h8" fill="none" stroke="#2f221e" opacity="0.14" strokeLinecap="round" strokeWidth="4" />
      <rect x="52" y="18" width="22" height="36" rx="8" fill="#fff8f4" stroke="#e7cec2" strokeWidth="2" />
      <path d="M58 28h10" fill="none" stroke="#2f221e" opacity="0.15" strokeLinecap="round" strokeWidth="3" />
      <path d="M58 35h8" fill="none" stroke="#2f221e" opacity="0.12" strokeLinecap="round" strokeWidth="3" />
      <path
        d="M62 58c6 0 11 5 11 11"
        fill="none"
        stroke="#d8745a"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M70 64l3 5-6 2"
        fill="none"
        stroke="#d8745a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <circle cx="30" cy="72" r="8" fill="#d8745a" opacity="0.16" />
      <path d="M27 72h6" fill="none" stroke="#d8745a" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}

function linkButtonClassName(variant: "primary" | "secondary") {
  if (variant === "primary") {
    return "inline-flex min-h-[3.75rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,var(--accent),var(--accent-strong))] px-6 py-4 text-base font-semibold tracking-[-0.01em] text-[var(--accent-ink)] shadow-[0_18px_44px_rgba(214,116,90,0.28)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_22px_54px_rgba(214,116,90,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
  }

  return "inline-flex min-h-[3.75rem] items-center justify-center rounded-[1.4rem] border border-[var(--line)] bg-white/78 px-6 py-4 text-base font-semibold tracking-[-0.01em] text-[var(--ink)] transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
}

export function LandingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
      <div className="space-y-6 sm:space-y-8">
        <header className="rounded-[2rem] border border-[rgba(120,83,66,0.08)] bg-white/68 px-4 py-4 shadow-[0_16px_40px_rgba(88,62,53,0.05)] backdrop-blur sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-4">
              <div>
                <SplitText
                  className="text-[0.84rem] font-semibold uppercase tracking-[0.24em] text-[var(--ink-soft)] sm:text-[0.94rem]"
                  delay={34}
                  duration={0.55}
                  from={{ opacity: 0, y: 10 }}
                  rootMargin="-20px"
                  splitType="chars"
                  tag="p"
                  text="Dopamine Menu"
                  textAlign="left"
                  to={{ opacity: 1, y: 0 }}
                />
                <p className="mt-2 text-[0.98rem] leading-7 text-[var(--ink-soft)] sm:text-[1.08rem]">
                  <ShinyText
                    color="#7a6056"
                    delay={0.2}
                    shineColor="#fffdfb"
                    speed={5.2}
                    spread={115}
                    text="Спокойная пауза перед быстрым дофамином"
                  />
                </p>
              </div>
              <Link
                className="inline-flex min-h-[2.8rem] items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[var(--ink)] ring-1 ring-[rgba(120,83,66,0.10)] sm:hidden"
                href="/app"
              >
                Открыть
              </Link>
            </div>

            <nav className="hidden items-center gap-2 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:bg-white/78 hover:text-[var(--ink)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
              <Link className={linkButtonClassName("primary")} href="/app">
                Попробовать
              </Link>
            </nav>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <Card className="overflow-hidden border-[rgba(198,113,87,0.15)] bg-[linear-gradient(160deg,rgba(255,252,249,0.98),rgba(255,241,233,0.92))] p-6 sm:p-8">
            <div className="space-y-6">
              <div className="inline-flex w-fit rounded-full border border-[rgba(120,83,66,0.08)] bg-white/72 px-4 py-2 text-sm font-semibold uppercase tracking-[0.17em] text-[var(--ink-soft)]">
                Без давления, без запретов
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-[2.5rem] font-bold leading-[0.92] tracking-[-0.07em] text-[var(--ink)] sm:text-[4.4rem]">
                  <BlurText
                    animateBy="words"
                    as="span"
                    className="block"
                    delay={150}
                    direction="top"
                    rootMargin="-40px"
                    stepDuration={0.38}
                    text="Когда тянет залипнуть — выбери здоровый дофамин"
                  />
                </h1>
                <p className="max-w-2xl text-[1.02rem] leading-8 text-[var(--ink)]/84 sm:text-[1.25rem] sm:leading-9">
                  Dopamine Menu помогает сделать паузу перед скроллом, сладким, фастфудом,
                  импульсивными покупками и прокрастинацией.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className={linkButtonClassName("primary")} href="/app">
                  Попробовать бесплатно
                </Link>
                <Link className={linkButtonClassName("secondary")} href="#how-it-works">
                  Как это работает
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] bg-white/72 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Пауза</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--ink)]">2–5 мин</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/72 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Формат</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--ink)]">Self-help</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/72 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">Тон</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--ink)]">Мягкий</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-[rgba(120,83,66,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,246,240,0.9))] p-5 sm:p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--ink-soft)]">Как выглядит маленький план спасения</p>
                <div className="rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--ink)] ring-1 ring-[rgba(120,83,66,0.08)]">
                  2 минуты
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[rgba(120,83,66,0.08)] bg-[linear-gradient(180deg,rgba(255,252,250,0.96),rgba(255,245,238,0.92))] p-5 shadow-[0_22px_52px_rgba(88,62,53,0.08)]">
                <div className="space-y-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                      Когда хочется сорваться
                    </p>
                    <h2 className="mt-3 text-[1.8rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--ink)]">
                      Открой паузу до того,
                      <br />
                      как откроется
                      <br />
                      следующая вкладка
                    </h2>
                  </div>

                  <p className="text-sm leading-7 text-[var(--ink-soft)]">
                    Приложение не отчитывает тебя. Оно даёт короткое действие, которое помогает
                    переключиться и вернуть контроль в моменте.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] bg-white/78 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Состояние</p>
                      <p className="mt-2 text-base font-semibold text-[var(--ink)]">Хочу скроллить</p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/78 px-4 py-4 ring-1 ring-[rgba(120,83,66,0.08)]">
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Действие</p>
                      <p className="mt-2 text-base font-semibold text-[var(--ink)]">Убери телефон и сделай 5 вдохов</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-6 text-[var(--ink-soft)]">
                Подходит для тех моментов, когда хочется не «идеально исправиться», а просто не уйти
                в автопилот прямо сейчас.
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-4" id="problem">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Проблема</p>
            <h2 className="text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-[var(--ink)] sm:text-[3rem]">
              Открыл телефон на 2 минуты — пропал на час?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {problemPoints.map((item) => (
              <Card key={item.id} className="min-h-[14rem] border-[rgba(120,83,66,0.08)] bg-white/84 p-5">
                <div className="flex h-full flex-col gap-5">
                  <div className="rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,245,240,0.95),rgba(255,250,247,0.88))] p-3">
                    <ProblemIllustration id={item.id} label={item.illustrationLabel} />
                  </div>
                  <p className="text-base leading-7 text-[var(--ink)]">{item.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" id="how-it-works">
          <Card className="border-[rgba(198,113,87,0.14)] bg-[linear-gradient(160deg,rgba(255,251,248,0.96),rgba(255,238,229,0.92))] p-6 sm:p-7">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Решение</p>
              <div className="max-w-3xl text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-[var(--ink)] sm:text-[3rem]">
                <ShinyText
                  className="block"
                  color="#2f221e"
                  delay={0.35}
                  shineColor="#fffaf7"
                  speed={6}
                  spread={132}
                  text="Приложение не запрещает. Оно помогает переключиться."
                />
              </div>
              <p className="text-base leading-8 text-[var(--ink-soft)]">
                Вместо большого «начинаю новую жизнь» ты получаешь маленький понятный шаг здесь и сейчас.
              </p>
            </div>
          </Card>

          <div className="space-y-3">
            {[
              "Выбери состояние",
              "Получи действие на 2–5 минут",
              "Запусти таймер",
              "Сохрани прогресс",
              "Если сорвался — мягко начни заново"
            ].map((step, index) => (
              <Card
                key={step}
                className="border-[rgba(120,83,66,0.08)] bg-white/88 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(216,116,90,0.12)] text-sm font-semibold text-[var(--ink)]">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{step}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                      {index === 0 &&
                        "Не нужно долго думать о себе. Просто честно отмечаешь, что с тобой сейчас."}
                      {index === 1 &&
                        "Короткое действие проще начать, чем большой план по самоконтролю."}
                      {index === 2 &&
                        "Таймер держит рамку, чтобы пауза не превратилась в ещё одну форму прокрастинации."}
                      {index === 3 &&
                        "Прогресс остаётся у тебя на устройстве и помогает замечать, что реально работает."}
                      {index === 4 &&
                        "Если день пошёл криво, приложение не наказывает, а помогает вернуться без стыда."}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4" id="who">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Для кого</p>
            <h2 className="text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-[var(--ink)] sm:text-[3rem]">
              Для тех, кто хочет вернуть себе внимание без жёсткости
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {audience.map((item) => (
              <div
                key={item}
                className="rounded-full border border-[rgba(120,83,66,0.08)] bg-white/80 px-4 py-3 text-sm font-medium text-[var(--ink)] shadow-[0_12px_28px_rgba(88,62,53,0.05)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4" id="inside">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Что внутри</p>
            <h2 className="text-[2rem] font-semibold leading-[1] tracking-[-0.05em] text-[var(--ink)] sm:text-[3rem]">
              Всё, что помогает сделать паузу, не усложняя себе жизнь
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-[rgba(120,83,66,0.08)] bg-white/86 p-5">
                <div className="space-y-3">
                  <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{feature.title}</p>
                  <p className="text-sm leading-7 text-[var(--ink-soft)]">{feature.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-[rgba(120,83,66,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,248,243,0.92))] p-6 sm:p-7">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Безопасность</p>
              <h2 className="text-[1.8rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--ink)] sm:text-[2.5rem]">
                Dopamine Menu — self-help инструмент
              </h2>
              <p className="text-base leading-8 text-[var(--ink-soft)]">
                Это не медицинская помощь и не замена специалисту. Приложение помогает мягко вернуть
                фокус и выбрать короткое действие, когда тебя тянет в быстрый дофамин.
              </p>
            </div>
          </Card>
        </section>

        <section className="pb-6">
          <Card className="border-[rgba(198,113,87,0.14)] bg-[linear-gradient(160deg,rgba(255,250,247,0.98),rgba(255,235,225,0.92))] p-6 text-center sm:p-8">
            <div className="mx-auto max-w-2xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">Финальный шаг</p>
              <h2 className="text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[var(--ink)] sm:text-[3.4rem]">
                Попробуй бесплатно и проверь, как ощущается пауза без стыда
              </h2>
              <p className="text-base leading-8 text-[var(--ink-soft)]">
                Откроется само приложение: без регистрации, без оплаты, без лишнего шума.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link className={linkButtonClassName("primary")} href="/app">
                  Попробовать бесплатно
                </Link>
                <Link className={linkButtonClassName("secondary")} href="#problem">
                  Сначала понять проблему
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
