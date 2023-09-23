import { GameInfo, State } from "../../types/types";

export const getCurrentGame = (state: State): GameInfo | null =>
  state.CURRENT_GAME.game;
