import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Home from "../app/page";
import { ANALYTICS_BROWSER_EVENT, type AnalyticsEvent } from "../lib/analytics";

describe("LandingPage", () => {
  test("renders animated landing sections and routes people into the app", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Когда тянет залипнуть — выбери здоровый дофамин"
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("link", { name: "Попробовать бесплатно" }).length
    ).toBeGreaterThan(0);

    const challengeLinks = screen.getAllByRole("link", { name: "7-дневный челлендж" });
    expect(challengeLinks.length).toBeGreaterThan(0);
    challengeLinks.forEach((link) => expect(link).toHaveAttribute("href", "/challenge"));

    expect(screen.getByText("Приложение не запрещает. Оно помогает переключиться.")).toBeInTheDocument();
  });

  test("tracks the landing view and app entry click", async () => {
    const events: AnalyticsEvent[] = [];
    const listener = (event: Event) => events.push((event as CustomEvent<AnalyticsEvent>).detail);
    window.addEventListener(ANALYTICS_BROWSER_EVENT, listener);

    render(<Home />);

    await waitFor(() => {
      expect(events.some((event) => event.name === "landing_view")).toBe(true);
    });

    const appLink = screen.getByRole("link", { name: "Попробовать" });
    appLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(appLink);

    expect(events).toContainEqual(
      expect.objectContaining({
        name: "app_start_clicked",
        properties: { source: "landing_header" }
      })
    );

    window.removeEventListener(ANALYTICS_BROWSER_EVENT, listener);
  });

  test("renders a dedicated illustration for each problem card", () => {
    render(<Home />);

    expect(screen.getByLabelText("Иллюстрация: бесконечный скролл")).toBeInTheDocument();
    expect(screen.getByLabelText("Иллюстрация: shorts и reels")).toBeInTheDocument();
    expect(screen.getByLabelText("Иллюстрация: прокрастинация перед учёбой")).toBeInTheDocument();
    expect(screen.getByLabelText("Иллюстрация: утренний телефонный автопилот")).toBeInTheDocument();
    expect(screen.getByLabelText("Иллюстрация: импульсивные покупки и еда")).toBeInTheDocument();
  });
});
