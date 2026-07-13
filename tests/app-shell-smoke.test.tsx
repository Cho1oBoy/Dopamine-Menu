import { afterEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import AppPage from "../app/app/page";
import { ANALYTICS_BROWSER_EVENT, type AnalyticsEvent } from "../lib/analytics";

function captureAnalyticsEvents() {
  const events: AnalyticsEvent[] = [];
  const listener = (event: Event) => events.push((event as CustomEvent<AnalyticsEvent>).detail);
  window.addEventListener(ANALYTICS_BROWSER_EVENT, listener);

  return {
    events,
    stop: () => window.removeEventListener(ANALYTICS_BROWSER_EVENT, listener)
  };
}

afterEach(() => {
  localStorage.clear();
});

test("renders the home screen title, primary action, and progress card", () => {
  render(<AppPage />);

  expect(screen.getByRole("heading", { name: /Dopamine Menu/i })).toBeInTheDocument();
  expect(
    screen.getByText("Когда хочется сорваться в быстрый дофамин")
  ).toBeInTheDocument();
  expect(screen.getByText(/прерывать импульс/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Меня тянет залипнуть" })
  ).toBeInTheDocument();
});

test("opens relapse mode from the home screen", () => {
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Я сорвался" }));

  expect(
    screen.getByRole("heading", { name: "Ты не провалил этот момент" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Вернуться за 2 минуты" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Записать, что произошло" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Начать заново" })
  ).toBeInTheDocument();
});

test("moves to state selection after clicking the primary action", () => {
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));

  expect(screen.getByText("Что сейчас ближе всего?")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Хочу скроллить/i })
  ).toBeInTheDocument();
});

test("shows a recommendation after choosing a state", () => {
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));

  expect(screen.getByText("Твой маленький план спасения")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Запустить таймер" })
  ).toBeInTheDocument();
});

test("tracks the recommendation flow through session completion", () => {
  const analytics = captureAnalyticsEvents();
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));
  fireEvent.click(screen.getByRole("button", { name: "Запустить таймер" }));
  fireEvent.click(screen.getByRole("button", { name: "Я сделал" }));

  expect(analytics.events.map((event) => event.name)).toEqual(
    expect.arrayContaining([
      "app_start_clicked",
      "state_selected",
      "action_recommended",
      "timer_started",
      "session_completed"
    ])
  );
  analytics.stop();
});

test("tracks opening slip mode", () => {
  const analytics = captureAnalyticsEvents();
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Я сорвался" }));

  expect(analytics.events).toContainEqual(
    expect.objectContaining({
      name: "slip_mode_opened",
      properties: { source: "home" }
    })
  );
  analytics.stop();
});

test("opens the journal page from the home screen", () => {
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Открыть журнал" }));

  expect(
    screen.getByRole("heading", { name: "Журнал наблюдений" })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Все" })).toBeInTheDocument();
});

test("offers adding a note after completing a session", () => {
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));
  fireEvent.click(screen.getByRole("button", { name: "Запустить таймер" }));
  fireEvent.click(screen.getByRole("button", { name: "Я сделал" }));

  expect(
    screen.getByRole("button", { name: "Добавить заметку" })
  ).toBeInTheDocument();
});

test("tracks a journal entry without its free text", () => {
  const analytics = captureAnalyticsEvents();
  render(<AppPage />);

  fireEvent.click(screen.getByRole("button", { name: "Меня тянет залипнуть" }));
  fireEvent.click(screen.getByRole("button", { name: /Хочу скроллить/i }));
  fireEvent.click(screen.getByRole("button", { name: "Запустить таймер" }));
  fireEvent.click(screen.getByRole("button", { name: "Я сделал" }));
  fireEvent.click(screen.getByRole("button", { name: "Добавить заметку" }));
  fireEvent.change(screen.getByPlaceholderText("Что подтолкнуло тебя к быстрому дофамину?"), {
    target: { value: "private trigger" }
  });
  fireEvent.change(screen.getByPlaceholderText("Что заметил про себя в этот момент?"), {
    target: { value: "private notes" }
  });
  fireEvent.click(screen.getByRole("button", { name: "Сохранить заметку" }));

  const journalEvent = analytics.events.find((event) => event.name === "journal_entry_created");
  expect(journalEvent).toMatchObject({
    name: "journal_entry_created",
    properties: { kind: "session", moodBefore: 3, moodAfter: 3 }
  });
  expect(JSON.stringify(journalEvent)).not.toContain("private trigger");
  expect(JSON.stringify(journalEvent)).not.toContain("private notes");
  analytics.stop();
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

  render(<AppPage />);

  expect(screen.getByText("1:30")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Я сделал" })).toBeInTheDocument();
});

test("reacts to browser back navigation", async () => {
  render(<AppPage />);

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
    expect(
      screen.getByRole("button", { name: "Меня тянет залипнуть" })
    ).toBeInTheDocument();
  });
});
