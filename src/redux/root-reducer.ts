import { combineReducers } from "@reduxjs/toolkit";
import { gamesSlice } from "./games/games-slice";
import { currentGameSlice } from "./current-game/current-game-slice";
import { NameSpace } from "../const";

export const rootReducer = combineReducers({
  [NameSpace.GAMES]: gamesSlice.reducer,
  [NameSpace.CURRENT_GAME]: currentGameSlice.reducer,
});
