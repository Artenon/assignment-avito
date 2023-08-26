import { combineReducers } from "@reduxjs/toolkit";
import { gamesSlice } from "./games/games-slice";
import { NameSpace } from "../const";

export const rootReducer = combineReducers({
  [NameSpace.GAMES]: gamesSlice.reducer,
});
