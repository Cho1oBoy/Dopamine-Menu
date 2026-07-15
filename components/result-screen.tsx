import { FeedbackLinks } from "./feedback-links";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type ResultScreenProps = {
  onAddNote: () => void;
  onAnother: () => void;
  onHelpful: () => void;
  onNotHelpful: () => void;
  onRelapse: () => void;
};

export function ResultScreen({
  onAddNote,
  onAnother,
  onHelpful,
  onNotHelpful,
  onRelapse
}: ResultScreenProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Шаг 4 из 4</p>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">Как сработало?</h2>
        <p className="text-sm leading-6 text-[var(--ink-soft)]">
          Отметь честно. Здесь нет правильного ответа, только следующая попытка.
        </p>
      </div>

      <Card className="space-y-3">
        <Button onClick={onHelpful}>Помогло</Button>
        <Button onClick={onNotHelpful} variant="secondary">
          Не помогло
        </Button>
        <Button onClick={onAddNote} variant="secondary">
          Добавить заметку
        </Button>
        <Button onClick={onAnother} variant="ghost">
          Хочу ещё одно действие
        </Button>
        <Button onClick={onRelapse} variant="ghost">
          Я сорвался
        </Button>
      </Card>

      <FeedbackLinks context="result" />
    </div>
  );
}
