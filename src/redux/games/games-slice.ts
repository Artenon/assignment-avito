import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchGames, filterGames } from "./api-actions";
import { Game, Filter } from "../../types/types";
import { toastifyOptions, NameSpace } from "../../const";

const initialState: {
  games: Game[];
  isLoading: boolean;
  filter: Filter;
  currentGame: Game | null;
} = {
  games: [],
  isLoading: false,
  filter: {
    categories: [],
    platform: null,
    sorting: null,
  },
  currentGame: null,
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
      });
  },
});

export default gamesSlice.actions;
