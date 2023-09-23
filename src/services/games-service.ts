import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { APIRoute, BASE_URL } from "../const";
import { Filter, Game, GameInfo, StatusResponse } from "../types/types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders(headers) {
        headers.set(
          "X-RapidAPI-Host",
          "free-to-play-games-database.p.rapidapi.com"
        );
        headers.set("X-RapidAPI-Key", process.env.REACT_APP_API_KEY!);
        return headers;
      },
    }),
    { maxRetries: 3 }
  ),
  endpoints: (builder) => ({
    fetchGames: builder.query<Game[] & StatusResponse, void>({
      query: () => APIRoute.Games,
    }),

    filterGames: builder.query<Game[] & StatusResponse, Filter>({
      query: ({ categories, platform, sorting }) => {
        if (categories && categories.length > 1) {
          return `${APIRoute.Filter}?tag=${categories.join(".")}${
            platform ? `&platform=${platform}` : ""
          }${sorting ? `&sort-by=${sorting}` : ""}`;
        } else {
          return `${APIRoute.Games}?${platform ? `platform=${platform}` : ""}${
            categories.length === 1 ? `&category=${categories[0]}` : ""
          }${sorting ? `&sort-by=${sorting}` : ""}`;
        }
      },
    }),

    fetchGame: builder.query<GameInfo & StatusResponse, string>({
      query: (id) => `${APIRoute.Game}?id=${id}`,
    }),
  }),
});

export const {
  useLazyFetchGamesQuery,
  useLazyFilterGamesQuery,
  useLazyFetchGameQuery,
} = gamesApi;
