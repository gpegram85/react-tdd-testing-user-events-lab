import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";
import userEvent from "@testing-library/user-event";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />)

  const addNameInput = screen.getByLabelText(/name/i)
  expect(addNameInput).toBeInTheDocument()

  const addEmailInput = screen.getByLabelText(/email/i)
  expect(addEmailInput).toBeInTheDocument()
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />)

  const interestCheckbox1 = screen.getByRole('checkbox', {name: /Magic: The Gathering TCG/i})
  expect(interestCheckbox1).toBeInTheDocument()

  const interestCheckbox2 = screen.getByRole('checkbox', {name: /PokeMon TCG/i})
  expect(interestCheckbox2).toBeInTheDocument()

  const interestCheckbox3 = screen.getByRole('checkbox', {name: /Lorcana TCG/i})
  expect(interestCheckbox3).toBeInTheDocument()
});

test("the checkboxes are initially unchecked", () => {
  render(<App />)

  const interestCheckbox1 = screen.getByRole('checkbox', {name: /Magic: The Gathering TCG/i})
  expect(interestCheckbox1).not.toBeChecked()

  const interestCheckbox2 = screen.getByRole('checkbox', {name: /Pokemon TCG/i})
  expect(interestCheckbox2).not.toBeChecked()

  const interestCheckbox3 = screen.getByRole('checkbox', {name: /Lorcana TCG/i})
  expect(interestCheckbox3).not.toBeChecked()
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />)

  const addNameInput = screen.getByLabelText(/name/i)
  userEvent.type(addNameInput, "Grey")
  expect(addNameInput).toHaveValue("Grey")

  const addEmailInput = screen.getByLabelText(/email/i)
  userEvent.type(addEmailInput, "Grey@test.com")
  expect(addEmailInput).toHaveValue("Grey@test.com")
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />)

  const interestCheckbox1 = screen.getByRole('checkbox', {name: /Magic: The Gathering TCG/i})
  userEvent.click(interestCheckbox1)
  expect(interestCheckbox1).toBeChecked()

  const interestCheckbox2 = screen.getByRole('checkbox', {name: /Pokemon TCG/i})
  userEvent.click(interestCheckbox2)
  expect(interestCheckbox2).toBeChecked()

  const interestCheckbox3 = screen.getByRole('checkbox', {name: /Lorcana TCG/i})
  userEvent.click(interestCheckbox3)
  expect(interestCheckbox3).toBeChecked()
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />)

  const addNameInput = screen.getByLabelText(/name/i)
  userEvent.type(addNameInput, "Grey")
  expect(addNameInput).toHaveValue("Grey")
  
  const addEmailInput = screen.getByLabelText(/email/i)
  userEvent.type(addEmailInput, "Grey@test.com")
  expect(addEmailInput).toHaveValue("Grey@test.com")

  const interestCheckbox1 = screen.getByRole('checkbox', {name: /Magic: The Gathering TCG/i})
  userEvent.click(interestCheckbox1)
  expect(interestCheckbox1).toBeChecked()

  const formSubmit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(formSubmit)
  expect(screen.getByText(/thanks for/i)).toBeInTheDocument()
});
