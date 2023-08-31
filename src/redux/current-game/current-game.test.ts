import { Action } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import { configureMockStore } from "@jedmao/redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import {
  actions,
  currentGameSlice,
  CurrentGameState,
} from "./current-game-slice";
import { fetchGame } from "./api-actions";
import { fakeGameInfo } from "../../mocks/game-info";
import { createAPI } from "../../api/api";
import { APIRoute } from "../../const";
import { State } from "../../types/types";

// При неудачном запросе последуют ещё три попытки
jest.setTimeout(20000);

describe("Reducer: current game", () => {
  let state: CurrentGameState;

  beforeEach(() => {
    state = {
      error: null,
      game: null,
      isLoading: false,
    };
  });

  it("Without additional parameters should return initial state", () => {
    expect(
      currentGameSlice.reducer(undefined, { type: "UNKNOWN_ACTION" })
    ).toEqual({
      error: null,
      game: null,
      isLoading: false,
    });
  });

  it("Should update game in state if request was fulfilled", () => {
    const game = fakeGameInfo(0);

    expect(
      currentGameSlice.reducer(state, {
        type: fetchGame.fulfilled.type,
        payload: game,
      })
    ).toEqual({
      error: null,
      game: game,
      isLoading: false,
    });
  });

  it("IsLoading should be true if request is pending", () => {
    expect(
      currentGameSlice.reducer(state, { type: fetchGame.pending })
    ).toEqual({
      error: null,
      game: null,
      isLoading: true,
    });
  });

  it("Error should be not null in state if request was rejected", () => {
    expect(
      currentGameSlice.reducer(state, {
        type: fetchGame.rejected.type,
        error: "Error",
      })
    ).toEqual({
      error: "error",
      game: null,
      isLoading: false,
    });
  });

  it("Should update game in state", () => {
    const { setCurrentGame } = actions;
    const game = fakeGameInfo(0);

    expect(
      currentGameSlice.reducer(state, {
        type: setCurrentGame.type,
        payload: game,
      })
    ).toEqual({
      error: null,
      game,
      isLoading: false,
    });
  });
});

describe("API Actions: Current game", () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it("Fetch Game (successful)", async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Game}?id=0`).reply(200);

    await store.dispatch(
      fetchGame({ id: "0", signal: new AbortController().signal })
    );

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([fetchGame.pending.type, fetchGame.fulfilled.type]);
  });

  it("Fetch Game (failure)", async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Game}?id=0`).reply(500);

    await store.dispatch(
      fetchGame({ id: "0", signal: new AbortController().signal })
    );

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([fetchGame.pending.type, fetchGame.rejected.type]);
  });
});
