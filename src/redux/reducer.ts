import { createReducer, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchGames, filterGames } from "./api-actions";
import { Game, Filter } from "../types/types";
import { toastifyOptions } from "../const";

const initialState: {
  games: Game[];
  isLoading: boolean;
  filter: Filter;
} = {
  games: [],
  isLoading: false,
  filter: {
    categories: [],
    platform: null,
    sorting: null,
  },
};

export const changeFilterGenres = createAction<string[]>("FILTER/changeGenres");
export const changeFilterPlatform = createAction<string>(
  "FILTER/changePlatform"
);
export const changeFilterSorting = createAction<string>("FILTER/changeSorting");

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
      toast.error("Ошибка при загрузке игр", toastifyOptions);
    })
    .addCase(filterGames.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(filterGames.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 0) {
        state.games = [];
      } else {
        state.games = action.payload;
      }
    })
    .addCase(filterGames.rejected, (state) => {
      state.isLoading = false;
      toast.error("Ошибка при фильтрации игр", toastifyOptions);
    })
    .addCase(changeFilterGenres, (state, action) => {
      state.filter.categories = action.payload;
    })
    .addCase(changeFilterPlatform, (state, action) => {
      state.filter.platform = action.payload;
    })
    .addCase(changeFilterSorting, (state, action) => {
      state.filter.sorting = action.payload;
    });
});
