import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchGame } from "./api-actions";
import { GameInfo } from "../../types/types";
import { toastifyOptions, NameSpace } from "../../const";

const initialState: {
  game: GameInfo | null;
  isLoading: boolean;
  error: null | string;
} = {
  game: null,
  isLoading: false,
  error: null,
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
        state.error = null;
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.game = action.payload;
      })
      .addCase(fetchGame.rejected, (state, action) => {
        if (action.error.name !== "CanceledError") {
          state.isLoading = false;
          state.error = "error";
          toast.error(
            "Не удалось получить информацию об игре",
            toastifyOptions
          );
        }
      });
  },
});

export const actions = currentGameSlice.actions;
