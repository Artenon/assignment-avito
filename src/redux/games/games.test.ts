import { Action } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import { configureMockStore } from "@jedmao/redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { gamesSlice, GamesSliceState } from "./games-slice";
import { fetchGames, filterGames } from "./api-actions";
import { fakeGame } from "../../mocks/game";
import { createAPI } from "../../api/api";
import { State } from "../../types/types";
import { APIRoute } from "../../const";

// При неудачном запросе последуют ещё три попытки
jest.setTimeout(20000);

const initialState = {
  games: [],
  isLoading: false,
  isFilterLoading: false,
  filter: {
    categories: [],
    platform: null,
    sorting: null,
  },
  currentGame: null,
  error: null,
};

describe("Reducer: games", () => {
  let state: GamesSliceState;

  beforeEach(() => {
    state = initialState;
  });

  it("Without additional parameters should return initial state", () => {
    expect(gamesSlice.reducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual({
      ...initialState,
    });
  });

  it("Should update games in state if fetchGames was fulfilled", () => {
    const games = [fakeGame(0), fakeGame(1)];

    expect(
      gamesSlice.reducer(state, {
        type: fetchGames.fulfilled.type,
        payload: games,
      })
    ).toEqual({
      games,
      isLoading: false,
      isFilterLoading: false,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: null,
    });
  });

  it("IsLoading should be true if fetchGames is pending", () => {
    expect(gamesSlice.reducer(state, { type: fetchGames.pending })).toEqual({
      games: [],
      isLoading: true,
      isFilterLoading: false,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: null,
    });
  });

  it("Error should be not null in state if fetchGames was rejected", () => {
    expect(
      gamesSlice.reducer(state, {
        type: fetchGames.rejected.type,
        error: "Error",
      })
    ).toEqual({
      games: [],
      isLoading: false,
      isFilterLoading: false,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: "error",
    });
  });

  it("Should update games in state if filterGames was fulfilled", () => {
    const games = [fakeGame(0), fakeGame(1)];

    expect(
      gamesSlice.reducer(state, {
        type: filterGames.fulfilled.type,
        payload: games,
      })
    ).toEqual({
      games,
      isLoading: false,
      isFilterLoading: false,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: null,
    });
  });

  it("IsLoading should be true if filterGames is pending", () => {
    expect(gamesSlice.reducer(state, { type: filterGames.pending })).toEqual({
      games: [],
      isLoading: false,
      isFilterLoading: true,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: null,
    });
  });

  it("Error should be not null in state if filterGames was rejected", () => {
    expect(
      gamesSlice.reducer(state, {
        type: filterGames.rejected.type,
        error: "Error",
      })
    ).toEqual({
      games: [],
      isLoading: false,
      isFilterLoading: false,
      filter: {
        categories: [],
        platform: null,
        sorting: null,
      },
      currentGame: null,
      error: "error",
    });
  });
});

describe("API Actions: Games", () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it("Fetch Games (successful)", async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Games).reply(200);

    await store.dispatch(fetchGames(new AbortController().signal));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchGames.pending.type,
      fetchGames.fulfilled.type,
    ]);
  });

  it("Fetch Games (failure)", async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Games).reply(500);

    await store.dispatch(fetchGames(new AbortController().signal));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchGames.pending.type,
      fetchGames.rejected.type,
    ]);
  });

  it("Filter Games (successful)", async () => {
    const store = mockStore({ GAMES: { filter: { categories: ["1"] } } });
    mockAPI.onAny().reply(200);

    await store.dispatch(filterGames(new AbortController().signal));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      filterGames.pending.type,
      filterGames.fulfilled.type,
    ]);
  });

  it("Filter Games (failure)", async () => {
    const store = mockStore();
    mockAPI.onAny().reply(500);

    await store.dispatch(filterGames(new AbortController().signal));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      filterGames.pending.type,
      filterGames.rejected.type,
    ]);
  });
});
