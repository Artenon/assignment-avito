import { Filter, Game, State } from "../../types/types";

export const getFilter = (state: State): Filter => state.GAMES.filter;
export const getGames = (state: State): Game[] => state.GAMES.games;
