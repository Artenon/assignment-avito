import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Store } from "@reduxjs/toolkit";
import { configureMockStore } from "@jedmao/redux-mock-store";
import { State } from "../../types/types";
import { createAPI } from "../../api/api";
import { FilterGenre, FilterPlatform, Sorting } from "./index";

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockAPI = new MockAdapter(api);

const mockStore = configureMockStore<State>(middlewares);
mockAPI.onAny().reply(200);

describe("Components: Filters", () => {
  describe("Genres", () => {
    const TestApp = ({ store }: { store: Store }) => (
      <Provider store={store}>
        <FilterGenre light />
      </Provider>
    );

    it("Should render correctly", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: ["category"],
            platform: null,
            sorting: null,
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByRole("heading").innerHTML).toEqual("Genres:");
      expect(screen.getByText("category")).toBeInTheDocument();
    });

    it("Should show placeholder if state is empty", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: [],
            platform: null,
            sorting: null,
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByText("Select Genre")).toBeInTheDocument();
    });
  });

  describe("Platform", () => {
    const TestApp = ({ store }: { store: Store }) => (
      <Provider store={store}>
        <FilterPlatform light />
      </Provider>
    );

    it("Should render correctly", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: [],
            platform: "pc",
            sorting: null,
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByRole("heading").innerHTML).toEqual("Platform:");
      expect(screen.getByText("Windows (PC)")).toBeInTheDocument();
    });

    it("Should show placeholder if state is empty", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: [],
            platform: null,
            sorting: null,
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByText("Select Platform")).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    const TestApp = ({ store }: { store: Store }) => (
      <Provider store={store}>
        <Sorting light />
      </Provider>
    );

    it("Should render correctly", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: [],
            platform: null,
            sorting: "alphabetical",
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByRole("heading").innerHTML).toEqual("Sort by:");
      expect(screen.getByText("Alphabetical")).toBeInTheDocument();
    });

    it("Should show placeholder if state is empty", () => {
      const initStore = mockStore({
        GAMES: {
          filter: {
            categories: [],
            platform: null,
            sorting: null,
          },
        },
      });

      render(<TestApp store={initStore} />);

      expect(screen.getByText("Select Sorting")).toBeInTheDocument();
    });
  });
});
