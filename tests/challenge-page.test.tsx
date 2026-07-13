import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ChallengePage from "../app/challenge/page";
import { ANALYTICS_BROWSER_EVENT, type AnalyticsEvent } from "../lib/analytics";

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

  test("tracks the challenge view and Telegram CTA without personal data", async () => {
    const events: AnalyticsEvent[] = [];
    const listener = (event: Event) => events.push((event as CustomEvent<AnalyticsEvent>).detail);
    window.addEventListener(ANALYTICS_BROWSER_EVENT, listener);

    render(<ChallengePage />);

    await waitFor(() => {
      expect(events.some((event) => event.name === "challenge_page_viewed")).toBe(true);
    });

    fireEvent.click(screen.getByRole("link", { name: "Хочу участвовать" }));

    expect(events).toContainEqual(
      expect.objectContaining({
        name: "challenge_cta_clicked",
        properties: { placement: "hero" }
      })
    );
    expect(events).toContainEqual(
      expect.objectContaining({
        name: "telegram_clicked",
        properties: { source: "challenge_hero" }
      })
    );

    window.removeEventListener(ANALYTICS_BROWSER_EVENT, listener);
  });
});
