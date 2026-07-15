import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { ResultScreen } from "../components/result-screen";
import { StatsScreen } from "../components/stats-screen";
import { createDefaultAppData } from "../lib/stats";

const resultProps = {
  onAddNote: vi.fn(),
  onAnother: vi.fn(),
  onHelpful: vi.fn(),
  onNotHelpful: vi.fn(),
  onRelapse: vi.fn()
};

test("offers feedback and bug report links after a completed session", () => {
  render(<ResultScreen {...resultProps} />);

  expect(
    screen.getByText("Помогло? Напиши короткий отзыв — это поможет улучшить приложение.")
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Оставить отзыв" })).toHaveAttribute(
    "href",
    "https://forms.yandex.ru/u/6a56dd6d84227c002b459a47/"
  );
  expect(screen.getByRole("link", { name: "Сообщить о баге" })).toHaveAttribute(
    "href",
    "https://t.me/your_username"
  );
});

test("keeps a quiet feedback entry point in statistics", () => {
  render(
    <StatsScreen
      data={createDefaultAppData()}
      onBack={vi.fn()}
      onOpenJournal={vi.fn()}
    />
  );

  expect(screen.getByText("Помоги сделать Dopamine Menu лучше")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Оставить отзыв" })).toHaveAttribute(
    "href",
    "https://forms.yandex.ru/u/6a56dd6d84227c002b459a47/"
  );
  expect(screen.getByRole("link", { name: "Сообщить о баге" })).toHaveAttribute(
    "href",
    "https://t.me/your_username"
  );
});
