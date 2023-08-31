import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Component: Spinner", () => {
  it("Should render correctly", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
