/**
 * Greet should render the text hello and if a name is passed into the component
 *It should render hello followed by the name
 */

/*Both Test ans expect methods from jest which create react
app globally provides in every test */
import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

describe("Greet", () => {
  test("renders correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
  });

  test("render a name", () => {
    render(<Greet name="Vishwas" />);
    const textElement = screen.getByText("Hello Vishwas");
    expect(textElement).toBeInTheDocument();
  });
});

describe("Nested", () => {
test("renders  a name", () => {
  render(<Greet name="Vishwas" />);
  const textElement = screen.getByText("Hello Vishwas");
  expect(textElement).toBeInTheDocument();
});
})
