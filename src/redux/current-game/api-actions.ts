import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { State, AppDispatch, GameInfo } from "../../types/types";
import { APIRoute, NameSpace } from "../../const";

export const fetchGame = createAsyncThunk<
  GameInfo,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.CURRENT_GAME}/fetchGame`,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<GameInfo>(`${APIRoute.Game}?id=${id}`);
    return data;
  }
);
