import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { YandexMetrica } from "../components/analytics/yandex-metrica";
import { trackEvent } from "../lib/analytics";

vi.mock("next/navigation", () => ({
  usePathname: () => "/challenge"
}));

vi.mock("next/script", () => ({
  default: ({ src }: { src: string }) => <script data-testid="metrica-script" data-src={src} />
}));

describe("YandexMetrica", () => {
  beforeEach(() => {
    delete window.ym;
  });

  test("does not load tracking without a valid counter ID", () => {
    const { container } = render(<YandexMetrica counterId="" />);

    expect(container).toBeEmptyDOMElement();
    expect(window.ym).toBeUndefined();
  });

  test("initializes SPA tracking and forwards product events as goals", async () => {
    render(<YandexMetrica counterId="12345678" />);

    await waitFor(() => {
      expect(window.ym?.a).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([12345678, "init"]),
          expect.arrayContaining([12345678, "hit"])
        ])
      );
    });

    trackEvent("challenge_cta_clicked", { placement: "hero" });

    expect(window.ym?.a).toContainEqual([
      12345678,
      "reachGoal",
      "challenge_cta_clicked",
      { placement: "hero" }
    ]);
  });
});
