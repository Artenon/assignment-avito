import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchGame } from "./api-actions";
import { GameInfo } from "../../types/types";
import { toastifyOptions, NameSpace } from "../../const";

const initialState: {
  game: GameInfo | null;
  isLoading: boolean;
} = {
  game: null,
  isLoading: false,
};

export const currentGameSlice = createSlice({
  name: NameSpace.CURRENT_GAME,
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<GameInfo>) => {
      state.game = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.game = action.payload;
      })
      .addCase(fetchGame.rejected, (state) => {
        state.isLoading = false;
        toast.error("Не удалось получить информацию об игре", toastifyOptions);
      });
  },
});

export const actions = currentGameSlice.actions;
