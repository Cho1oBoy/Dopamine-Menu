import { Card } from "./ui/card";

const FEEDBACK_URL = "https://forms.yandex.ru/u/6a56dd6d84227c002b459a47/";
const BUG_REPORT_URL = "https://t.me/your_username";

type FeedbackLinksProps = {
  context: "result" | "stats";
};

const linkClassName =
  "inline-flex min-h-12 flex-1 items-center justify-center rounded-[1.25rem] px-4 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

export function FeedbackLinks({ context }: FeedbackLinksProps) {
  const isResult = context === "result";

  return (
    <Card className="space-y-4 border-[rgba(120,83,66,0.08)] bg-white/72 shadow-[0_16px_38px_rgba(88,62,53,0.05)]">
      <div className="space-y-1.5">
        {!isResult && (
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Помоги сделать Dopamine Menu лучше
          </h3>
        )}
        <p className="text-sm leading-6 text-[var(--ink-soft)]">
          {isResult
            ? "Помогло? Напиши короткий отзыв — это поможет улучшить приложение."
            : "Есть мысль или заметил ошибку? Можно написать в пару кликов."}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          className={`${linkClassName} bg-[rgba(255,249,245,0.92)] text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-white`}
          href={FEEDBACK_URL}
          rel="noreferrer"
          target="_blank"
        >
          Оставить отзыв
        </a>
        <a
          className={`${linkClassName} bg-transparent text-[var(--ink-soft)] ring-1 ring-[var(--line)] hover:bg-white/70 hover:text-[var(--ink)]`}
          href={BUG_REPORT_URL}
          rel="noreferrer"
          target="_blank"
        >
          Сообщить о баге
        </a>
      </div>
    </Card>
  );
}
