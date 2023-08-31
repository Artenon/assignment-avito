import { render, screen } from "@testing-library/react";
import { LightText } from "./light-text";

describe("Component: LightText", () => {
  it("Should render correctly", () => {
    render(<LightText text="test text" />);

    expect(screen.getByText("test text")).toBeInTheDocument();
  });
});
