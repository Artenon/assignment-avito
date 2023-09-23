import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game, Filter } from "../../types/types";
import { NameSpace } from "../../const";

export type GamesSliceState = {
  games: Game[];
  filter: Filter;
  currentGame: Game | null;
};

const initialState: GamesSliceState = {
  games: [],
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
    changeFilterGenres: (state, action: PayloadAction<string[]>) => {
      state.filter.categories = action.payload;
    },
    changeFilterPlatform: (state, action: PayloadAction<string>) => {
      state.filter.platform = action.payload;
    },
    changeFilterSorting: (state, action: PayloadAction<string>) => {
      state.filter.sorting = action.payload;
    },
    changeGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
  },
});

export default gamesSlice.actions;
