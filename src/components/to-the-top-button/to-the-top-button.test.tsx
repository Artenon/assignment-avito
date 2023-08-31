import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToTheTopButton } from "./to-the-top-button";

window.scrollTo = jest.fn();

describe("Component: ToTheTopButton", () => {
  it("Should make scroll", async () => {
    render(<ToTheTopButton />);

    await userEvent.click(screen.getByTestId("to-the-top"));

    expect(window.scrollTo).toBeCalled();
  });
});
