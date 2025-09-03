import React from "react";

import MyComponent from "../components/MyComponent";
import { render, screen } from "@testing-library/react";

describe("MyComponent", () => {
  it("renders the component", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello, Next.js!")).toBeInTheDocument();
  });
});
