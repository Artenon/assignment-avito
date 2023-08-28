import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";
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

    const cookies = new Cookies();
    cookies.set(String(data.id), data, { path: "/", maxAge: 300 });

    return data;
  }
);
