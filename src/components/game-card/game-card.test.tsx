import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import HistoryRouter from "../history-router/history-router";
import { GameCard } from "./game-card";
import { fakeGame } from "../../mocks/game";

const history = createMemoryHistory();

describe("Component: GameCard", () => {
  it("Should render correctly", () => {
    render(
      <HistoryRouter history={history}>
        <GameCard game={fakeGame(0)} />
      </HistoryRouter>
    );

    expect(screen.getByTestId("game-card")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("developer")).toBeInTheDocument();
    expect(screen.getByText("genre")).toBeInTheDocument();
    expect(screen.getByText("1 января 2001 г.")).toBeInTheDocument();
  });
});
