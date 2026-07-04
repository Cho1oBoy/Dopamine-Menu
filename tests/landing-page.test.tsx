import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Home from "../app/page";

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

    expect(screen.getByText("Приложение не запрещает. Оно помогает переключиться.")).toBeInTheDocument();
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
