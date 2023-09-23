import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { gamesApi } from "../services/games-service";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
});
