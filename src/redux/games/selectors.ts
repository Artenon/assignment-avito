import { Filter, Game, State } from "../../types/types";

export const getGames = (state: State): Game[] => state.GAMES.games;
export const getIsLoading = (state: State): boolean => state.GAMES.isLoading;
export const getIsFilterLoading = (state: State): boolean =>
  state.GAMES.isFilterLoading;
export const getFilter = (state: State): Filter => state.GAMES.filter;
export const getError = (state: State): string | null => state.GAMES.error;
