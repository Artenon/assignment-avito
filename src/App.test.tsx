import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Store } from "@reduxjs/toolkit";
import { configureMockStore } from "@jedmao/redux-mock-store";
import HistoryRouter from "./components/history-router/history-router";
import { AppRoute } from "./const";
import App from "./App";
import { State } from "./types/types";
import { fakeGame } from "./mocks/game";
import { fakeGameInfo, fakeGameLessInfo } from "./mocks/game-info";
import { createAPI } from "./api/api";

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockAPI = new MockAdapter(api);

const mockStore = configureMockStore<State>(middlewares);
mockAPI.onAny().reply(200);

const initStore = mockStore({
  GAMES: {
    games: [fakeGame(0), fakeGame(1)],
    isLoading: false,
    isFilterLoading: false,
    filter: {
      categories: [],
      platform: null,
      sorting: null,
    },
    currentGame: null,
    error: null,
  },
  CURRENT_GAME: {
    game: fakeGameInfo(0),
    isLoading: false,
    error: null,
  },
});

const history = createMemoryHistory();

const TestApp = ({ store }: { store: Store }) => (
  <HistoryRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>
);

window.scrollTo = jest.fn();

describe("Component: App", () => {
  describe("App Routing", () => {
    it('Should render MainPage when user navigate to "/"', () => {
      history.push(AppRoute.Main);

      render(<TestApp store={initStore} />);

      expect(screen.getByTestId("main-page")).toBeInTheDocument();
      expect(screen.getByTestId("filters")).toBeInTheDocument();
    });

    it('Should render GamePage when user navigate to "/game/:gameID"', () => {
      history.push(`${AppRoute.Game}/0`);

      render(<TestApp store={initStore} />);

      expect(screen.getByTestId("game-page")).toBeInTheDocument();
    });
  });

  describe("Should render correctly", () => {
    it("Main page", () => {
      history.push(AppRoute.Main);

      render(<TestApp store={initStore} />);

      expect(screen.getAllByTestId("game-card")).toHaveLength(2);
    });

    it("Main page: should show 'nothing found' if games array is empty", () => {
      history.push(AppRoute.Main);

      const store = mockStore({
        GAMES: {
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
        },
      });

      render(<TestApp store={store} />);

      expect(screen.getByText("Ничего не найдено :(")).toBeInTheDocument();
    });

    it("Game page", () => {
      history.push(`${AppRoute.Game}/0`);

      render(<TestApp store={initStore} />);

      expect(screen.getByTestId("back-btn")).toBeInTheDocument();
      expect(screen.getByTestId("screenshots")).toBeInTheDocument();
      expect(screen.getByTestId("requirements")).toBeInTheDocument();
      expect(screen.getByText("Genre:")).toBeInTheDocument();
      expect(screen.getByText("Publisher:")).toBeInTheDocument();
      expect(screen.getByText("Developer:")).toBeInTheDocument();
      expect(screen.getByText("Release:")).toBeInTheDocument();
    });

    it("Game page: should show 'nothing found' if error", () => {
      history.push(`${AppRoute.Game}/0`);

      const store = mockStore({
        CURRENT_GAME: {
          game: null,
          isLoading: false,
          error: "error",
        },
      });

      render(<TestApp store={store} />);

      expect(screen.getByText("Ничего не найдено :(")).toBeInTheDocument();
    });

    it("Game page: screenshots are empty and no system requirements", () => {
      history.push(`${AppRoute.Game}/0`);

      const store = mockStore({
        CURRENT_GAME: {
          game: fakeGameLessInfo(0),
          isLoading: false,
          error: null,
        },
      });

      render(<TestApp store={store} />);

      expect(screen.queryByTestId("requirements")).not.toBeInTheDocument();
      expect(screen.getByTestId("no-screens")).toBeInTheDocument();
    });
  });
});
