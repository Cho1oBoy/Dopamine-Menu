import { SUGGESTIONS } from "./content";
import type { Suggestion } from "./types";

export function getSuggestionsForState(stateId: string): Suggestion[] {
  return SUGGESTIONS.filter((item) => item.stateId === stateId);
}

export function getSuggestionById(suggestionId: string): Suggestion | null {
  return SUGGESTIONS.find((item) => item.id === suggestionId) ?? null;
}

export function pickSuggestion(stateId: string, currentSuggestionId?: string): Suggestion | null {
  const items = getSuggestionsForState(stateId);

  if (items.length === 0) {
    return null;
  }

  const pool =
    currentSuggestionId && items.length > 1
      ? items.filter((item) => item.id !== currentSuggestionId)
      : items;

  const index = Math.floor(Math.random() * pool.length);

  return pool[index] ?? pool[0] ?? null;
}
