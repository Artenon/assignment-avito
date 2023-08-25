import { createReducer } from "@reduxjs/toolkit";
import { fetchGames } from "./api-actions";
import { Game } from "../types/types";

const initialState: {
  games: Game[];
  isLoading: boolean;
} = {
  games: [],
  isLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchGames.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchGames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    })
    .addCase(fetchGames.rejected, (state) => {
      state.isLoading = false;
    });
});
