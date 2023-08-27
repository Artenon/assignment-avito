import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { gamesSlice } from "./games/games-slice";
import { currentGameSlice } from "./current-game/current-game-slice";
import { NameSpace } from "../const";

const persistConfig = {
  key: "currentGame",
  storage,
};

const persistedCurrentGameSlice = persistReducer(
  persistConfig,
  currentGameSlice.reducer
);

export const rootReducer = combineReducers({
  [NameSpace.GAMES]: gamesSlice.reducer,
  [NameSpace.CURRENT_GAME]: persistedCurrentGameSlice,
});
