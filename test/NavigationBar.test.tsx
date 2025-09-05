import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavigationBar from "@/components/nav/NavigationBar";

describe("NavigationBar", () => {
  it("renders all navigation items", () => {
    render(<NavigationBar pathname="/feed" />); // ✅ Pass pathname prop

    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("Feed")).toBeInTheDocument();
    expect(screen.getByLabelText("Add")).toBeInTheDocument();
    expect(screen.getByLabelText("Alert")).toBeInTheDocument();
    expect(screen.getByLabelText("User")).toBeInTheDocument();
  });
});
