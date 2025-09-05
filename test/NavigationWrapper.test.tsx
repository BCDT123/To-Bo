import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationWrapper from "@/components/nav/NavigationWrapper";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("NavigationWrapper", () => {
  it("does not render NavigationBar on login route", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    render(<NavigationWrapper />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders NavigationBar on protected route", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    render(<NavigationWrapper />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
