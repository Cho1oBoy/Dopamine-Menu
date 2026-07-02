import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import BlurText from "../components/blur-text";

class MockIntersectionObserver {
  constructor(
    private readonly callback: IntersectionObserverCallback
  ) {}

  disconnect() {}

  observe() {
    this.callback(
      [
        {
          isIntersecting: true
        } as IntersectionObserverEntry
      ],
      this as unknown as IntersectionObserver
    );
  }

  unobserve() {}
}

describe("BlurText", () => {
  test("renders each word and fires the completion callback", async () => {
    const handleComplete = vi.fn();

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    render(
      <BlurText
        animateBy="words"
        delay={0}
        onAnimationComplete={handleComplete}
        stepDuration={0}
        text="Dopamine Menu"
      />
    );

    expect(screen.getByText("Dopamine")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();

    await vi.waitFor(() => {
      expect(handleComplete).toHaveBeenCalled();
    });

    vi.unstubAllGlobals();
  });
});
