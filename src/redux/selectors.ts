import { Game, State } from "../types/types";

export const getGames = (state: State): Game[] => state.games;
export const getIsLoading = (state: State): boolean => state.isLoading;
