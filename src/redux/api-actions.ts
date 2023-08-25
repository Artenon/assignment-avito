import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { State, AppDispatch, Game } from "../types/types";
import { APIRoute } from "../const";

export const fetchGames = createAsyncThunk<
  Game[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(`GAMES/fetchGames`, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Game[]>(APIRoute.Games);
  return data;
});

export const filterGames = createAsyncThunk<
  Game[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(`GAMES/filterGames`, async (p, { dispatch, extra: api, getState }) => {
  const { data } = await api.get<Game[]>(
    `${APIRoute.Games}?${APIRoute.Platform}${p}`
  );
  return data;
});
