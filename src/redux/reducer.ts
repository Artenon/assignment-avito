import { createReducer } from "@reduxjs/toolkit";
import { fetchGames, filterGames } from "./api-actions";
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
    })
    .addCase(filterGames.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(filterGames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    })
    .addCase(filterGames.rejected, (state) => {
      state.isLoading = false;
    });
});
