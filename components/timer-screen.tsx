import { Button } from "./ui/button";
import { Card } from "./ui/card";

type TimerScreenProps = {
  durationSec: number;
  remainingSec: number;
  title: string;
  onCancel: () => void;
  onComplete: () => void;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function TimerScreen({
  durationSec,
  remainingSec,
  title,
  onCancel,
  onComplete
}: TimerScreenProps) {
  const progress = Math.max(0, Math.min(100, ((durationSec - remainingSec) / durationSec) * 100));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">Шаг 3 из 4</p>
        <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-[2.6rem]">
          Побудь в этом действии ещё немного
        </h2>
        <p className="max-w-lg text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
          Сейчас важна не идеальность, а несколько спокойных минут вне автопилота.
        </p>
      </div>

      <Card className="space-y-6 border-[rgba(120,83,66,0.10)] bg-[linear-gradient(180deg,rgba(255,252,249,0.98),rgba(255,242,235,0.96))] p-6 text-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">сейчас ты делаешь</p>
          <p className="mx-auto max-w-md text-base leading-7 text-[var(--ink)] sm:text-lg">
            {title}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[4.5rem] font-semibold leading-none tracking-[-0.09em] text-[var(--ink)] sm:text-[5.5rem]">
            {formatTime(remainingSec)}
          </p>
          <div className="mx-auto h-3 w-full max-w-md overflow-hidden rounded-full bg-[rgba(120,83,66,0.08)]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-soft))] transition-[width] duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button onClick={onComplete}>Я сделал</Button>
        <Button onClick={onCancel} variant="secondary">
          Отмена
        </Button>
      </div>
    </div>
  );
}
