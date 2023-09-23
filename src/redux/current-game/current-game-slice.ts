import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameInfo } from "../../types/types";
import { NameSpace } from "../../const";

export type CurrentGameState = {
  game: GameInfo | null;
};

const initialState: CurrentGameState = {
  game: null,
};

export const currentGameSlice = createSlice({
  name: NameSpace.CURRENT_GAME,
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<GameInfo>) => {
      state.game = action.payload;
    },
  },
});

export const actions = currentGameSlice.actions;
