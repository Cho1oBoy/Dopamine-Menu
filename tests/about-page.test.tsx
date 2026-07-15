import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import AboutPage from "../app/about/page";

describe("AboutPage", () => {
  test("shares the founder story without medical promises", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        name: "Я делаю Dopamine Menu, потому что сам устал жить на автопилоте"
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Мне 17/i)).toBeInTheDocument();
    expect(screen.getByText(/Я не психолог и не врач/i)).toBeInTheDocument();
    expect(screen.getByText("без стыда")).toBeInTheDocument();
    expect(screen.getByText("срывы — часть процесса")).toBeInTheDocument();
    expect(screen.getByText("строю продукт для СНГ-комьюнити")).toBeInTheDocument();
  });

  test("links to the app and Telegram", () => {
    render(<AboutPage />);

    expect(screen.getByRole("link", { name: "Попробовать приложение" })).toHaveAttribute(
      "href",
      "/app"
    );
    expect(screen.getByRole("link", { name: "Присоединиться к Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/your_username"
    );
  });
});
