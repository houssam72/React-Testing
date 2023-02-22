import { render, screen } from "@testing-library/react";
import { Application } from "./Application";

describe("Applicfation", () => {
  test("render correctly", () => {
    render(<Application />);
    // We test if the input (with label Name <label htmlFor="name">Name</label>) Element is present or not

    //  We test if we have a heading (from h1 o h6)
    const h1Heading = screen.getByRole("heading", {
      level: 1,
      name: "Job application form",
    });
    expect(h1Heading).toBeInTheDocument();

    const h2Heading = screen.getByRole("heading", {
      level: 2,
      name: "Section 1",
    });
    expect(h2Heading).toBeInTheDocument();

    const nameElement = screen.getByRole("textbox", {
      name: "Name",
    });
    expect(nameElement).toBeInTheDocument();

    // We test if the input (with label Bio <label htmlFor="bio">Bio</label>) Element is present or not
    const bioElement = screen.getByRole("textbox", {
      name: "Bio",
    });
    expect(bioElement).toBeInTheDocument();

    // We test if the select dropdown Element is present or not
    const jobLocationElement = screen.getByRole("combobox");
    expect(jobLocationElement).toBeInTheDocument();

    //   We test if the checkboks Element is present or not
    const termsElement = screen.getByRole("checkbox");
    expect(termsElement).toBeInTheDocument();

    // Test if the Button Element is present or not
    const submitButtonElement = screen.getByRole("button");
    expect(submitButtonElement).toBeInTheDocument();

    {/*  GetByLabelText */}

    // const nameElement2 = screen.getByLabelText("Name");
    // expect(nameElement2).toBeInTheDocument();
    // if we have many Element with the same label we can add the selector
    const nameElement2Test = screen.getByLabelText("Name", {
      selector: "input",
    });
    expect(nameElement2Test).toBeInTheDocument();
    const termsElement2 = screen.getByLabelText(
      "I agree to the terms and conditions"
    );
    expect(termsElement2).toBeInTheDocument();

    {/* getByPlaceholderText */}
    const nameElement3=screen.getByPlaceholderText("FullName")
    expect(nameElement3).toBeInTheDocument()

    {/*getByText */}
    const paragraphElement=screen.getByText("All fields are mandatory")
    expect(paragraphElement).toBeInTheDocument()

     {/*getByDisplayValue */}
  const nameElement4=screen.getByDisplayValue('Vishwase')
  expect(nameElement4).toBeInTheDocument()

     {/*getByAltText*/}
 const imageElement=screen.getByAltText('a person with a laptop')
 expect(imageElement).toBeInTheDocument()

 {/* getByTitle */}
const closeElement=screen.getByTitle("close")
expect(closeElement).toBeInTheDocument()

{/*getByTestId*/}
const customElement=screen.getByTestId('custom-element')
expect(customElement).toBeInTheDocument()

expect(submitButtonElement).toBeDisabled()
  });

 
});
