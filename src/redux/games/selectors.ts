import { Game, State } from "../../types/types";

export const getGames = (state: State): Game[] => state.GAMES.games;
export const getIsLoading = (state: State): boolean => state.GAMES.isLoading;
