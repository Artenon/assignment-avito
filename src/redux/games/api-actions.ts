import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { State, AppDispatch, Game, StatusResponse } from "../../types/types";
import { APIRoute, NameSpace } from "../../const";

export const fetchGames = createAsyncThunk<
  Game[],
  AbortSignal,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(`${NameSpace.GAMES}/fetchGames`, async (signal, { dispatch, extra: api }) => {
  const { data } = await api.get<Game[]>(APIRoute.Games, { signal });
  return data;
});

export const filterGames = createAsyncThunk<
  Game[] & StatusResponse,
  AbortSignal,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${NameSpace.GAMES}/filterGames`,
  async (signal, { dispatch, extra: api, getState }) => {
    const {
      GAMES: {
        filter: { categories, platform, sorting },
      },
    } = getState();

    if (categories && categories.length > 1) {
      const { data } = await api.get<Game[] & StatusResponse>(
        `${APIRoute.Filter}?tag=${categories.join(".")}${
          platform ? `&platform=${platform}` : ""
        }${sorting ? `&sort-by=${sorting}` : ""}`,
        { signal }
      );
      return data;
    } else {
      const { data } = await api.get<Game[] & StatusResponse>(
        `${APIRoute.Games}?${platform ? `platform=${platform}` : ""}${
          categories.length === 1 ? `&category=${categories[0]}` : ""
        }${sorting ? `&sort-by=${sorting}` : ""}`,
        { signal }
      );
      return data;
    }
  }
);
