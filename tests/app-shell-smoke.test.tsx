import { afterEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import Home from "../app/page";

afterEach(() => {
  localStorage.clear();
});

test("renders the home screen title, primary action, and progress card", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: /Dopamine Menu/i })).toBeInTheDocument();
  expect(screen.getByText("Когда хочется сорваться в быстрый дофамин")).toBeInTheDocument();
  expect(screen.getByText(/прерывать импульс/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Меня тянет залипнуть" })).toBeInTheDocument();
});

test("opens relapse mode from the home screen", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Я сорвался" }));

  expect(screen.getByRole("heading", { name: "Ты не провалил этот момент" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Вернуться за 2 минуты" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Записать, что произошло" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Начать заново" })).toBeInTheDocument();
});

test("moves to state selection after clicking the primary action", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));

  expect(screen.getByText("Что сейчас ближе всего?")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Хочу скроллить/i })).toBeInTheDocument();
});

test("shows a recommendation after choosing a state", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));

  expect(screen.getByText("Твой маленький план спасения")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Запустить таймер" })).toBeInTheDocument();
});

test("opens the journal page from the home screen", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Открыть журнал" }));

  expect(screen.getByRole("heading", { name: "Журнал наблюдений" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Все" })).toBeInTheDocument();
});

test("offers adding a note after completing a session", () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));
  fireEvent.click(screen.getByRole("button", { name: "Запустить таймер" }));
  fireEvent.click(screen.getByRole("button", { name: "Я сделал" }));

  expect(screen.getByRole("button", { name: "Добавить заметку" })).toBeInTheDocument();
});

test("restores an active timer session after reload", () => {
  localStorage.setItem(
    "dopamine-menu-ui-state",
    JSON.stringify({
      step: "timer",
      selectedStateId: "scroll",
      selectedSuggestionId: "scroll-breath",
      recentSessionId: null,
      journalSessionId: null,
      remainingSec: 90,
      timerMode: "suggestion",
      timerEndsAt: null
    })
  );

  render(<Home />);

  expect(screen.getByText("1:30")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Я сделал" })).toBeInTheDocument();
});

test("reacts to browser back navigation", async () => {
  render(<Home />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  expect(screen.getByText("Что сейчас ближе всего?")).toBeInTheDocument();

  await act(async () => {
    window.dispatchEvent(
      new PopStateEvent("popstate", {
        state: {
          dopamineMenuUi: {
            step: "home",
            selectedStateId: null,
            selectedSuggestionId: null,
            recentSessionId: null,
            journalSessionId: null,
            remainingSec: 0,
            timerMode: "suggestion",
            timerEndsAt: null
          }
        }
      })
    );
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Меня тянет залипнуть" })).toBeInTheDocument();
  });
});
