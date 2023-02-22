import {  screen } from "@testing-library/react";
import { MuiMode } from "./MuiMode";
import { render } from "../../test-utils";

describe("MuiMode", () => {
  test("renders text correctly", () => {
    render(<MuiMode />);
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveTextContent("dark mode");
  });
});
