import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./pagination";
import { Game } from "../../types/types";
import { fakeGame } from "../../mocks/game";

const fakeGames: Game[] = [];

for (let i = 0; i < 20; i++) {
  fakeGames.push(fakeGame(i));
}

describe("Component: Pagination", () => {
  it("Should render correctly", () => {
    render(<Pagination games={fakeGames} setCurrentItems={jest.fn()} />);

    expect(screen.getAllByRole("button")).toHaveLength(8);
    expect(screen.getAllByText("1")).toHaveLength(2);
    expect(screen.getAllByText("2")).toHaveLength(2);
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("Should react correctly to user actions", async () => {
    const setCurrentItems = jest.fn();
    render(<Pagination games={fakeGames} setCurrentItems={setCurrentItems} />);

    await userEvent.click(screen.getAllByRole("listitem")[1]);
    expect(setCurrentItems).toBeCalled();
  });
});
