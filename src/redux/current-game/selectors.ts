import { GameInfo, State } from "../../types/types";

export const getCurrentGame = (state: State): GameInfo | null =>
  state.CURRENT_GAME.game;

export const getIsLoading = (state: State): boolean =>
  state.CURRENT_GAME.isLoading;
