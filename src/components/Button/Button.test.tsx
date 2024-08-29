import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("<Button />", () => {
  test("renders correctly with label", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });
  test("applies primary style by default", async () => {
    render(<Button>Click Me</Button>);

    await waitFor(() => {
      expect(screen.getByText("Click Me")).toHaveClass("bg-blue-500");
    });
  });

  test("applies secondary style when variant is secondary", () => {
    render(<Button variant="secondary">Click Me</Button>);
    expect(screen.getByText("Click Me")).toHaveClass("bg-gray-300");
  });
});
