import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchGames, filterGames } from "./api-actions";
import { Game, Filter } from "../../types/types";
import { toastifyOptions, NameSpace } from "../../const";

const initialState: {
  games: Game[];
  isLoading: boolean;
  isFilterLoading: boolean;
  filter: Filter;
  currentGame: Game | null;
  error: null | string;
} = {
  games: [],
  isLoading: false,
  isFilterLoading: false,
  filter: {
    categories: [],
    platform: null,
    sorting: null,
  },
  currentGame: null,
  error: null,
};

export const gamesSlice = createSlice({
  name: NameSpace.GAMES,
  initialState,
  reducers: {
    changeFilterGenres: (state, action) => {
      state.filter.categories = action.payload;
    },
    changeFilterPlatform: (state, action) => {
      state.filter.platform = action.payload;
    },
    changeFilterSorting: (state, action) => {
      state.filter.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.name !== "CanceledError") {
          state.error = "error";
          toast.error("Ошибка при загрузке игр", toastifyOptions);
        }
      })
      .addCase(filterGames.pending, (state) => {
        state.isFilterLoading = true;
        state.error = null;
      })
      .addCase(filterGames.fulfilled, (state, action) => {
        state.isFilterLoading = false;
        if (action.payload.status === 0) {
          state.games = [];
        } else {
          state.games = action.payload;
        }
      })
      .addCase(filterGames.rejected, (state, action) => {
        if (action.error.name !== "CanceledError") {
          state.isFilterLoading = false;
          state.error = "error";
          toast.error("Ошибка при фильтрации игр", toastifyOptions);
        }
      });
  },
});

export default gamesSlice.actions;
