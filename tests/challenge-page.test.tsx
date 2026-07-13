import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ChallengePage from "../app/challenge/page";

describe("ChallengePage", () => {
  test("explains the seven-day challenge without medical promises", () => {
    render(<ChallengePage />);

    expect(
      screen.getByRole("heading", {
        name: "7 дней, чтобы вернуть контроль над телефоном"
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Стартовая цена: 299 ₽")).toBeInTheDocument();
    expect(screen.getByText(/Я не психолог и не обещаю чудес/i)).toBeInTheDocument();
    expect(screen.getByText("День 7")).toBeInTheDocument();
    expect(screen.getByText("Собираем систему на следующие 30 дней")).toBeInTheDocument();
  });

  test("sends every participation CTA to Telegram", () => {
    render(<ChallengePage />);

    const telegramLinks = [
      ...screen.getAllByRole("link", { name: /Хочу участвовать|Вступить в первую группу/i })
    ];

    expect(telegramLinks).toHaveLength(2);
    telegramLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://t.me/your_username");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
