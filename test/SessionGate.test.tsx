// __tests__/SessionGate.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import SessionGate from "@/modules/auth/components/SessionGate";
import "@testing-library/jest-dom";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/firebaseConfig", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe("SessionGate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRouterReplace = jest.fn();
  const mockChildren = (
    <div data-testid="protected-content">Contenido protegido</div>
  );

  it("shows spinner while user is undefined", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });

    (auth.onAuthStateChanged as jest.Mock).mockImplementation((cb: any) => {
      cb(undefined); // Simula estado inicial
      return () => {};
    });

    render(<SessionGate>{mockChildren}</SessionGate>);
    expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner
  });

  it("renders children on public route even if user is null", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });

    (auth.onAuthStateChanged as jest.Mock).mockImplementation((cb: any) => {
      cb(null); // No hay usuario
      return () => {};
    });

    render(<SessionGate>{mockChildren}</SessionGate>);
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  it("renders children when user is authenticated", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });

    (auth.onAuthStateChanged as jest.Mock).mockImplementation((cb: any) => {
      cb({ uid: "123" }); // Usuario autenticado
      return () => {};
    });

    render(<SessionGate>{mockChildren}</SessionGate>);
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  it("redirects to /login when user is null and route is protected", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });

    (auth.onAuthStateChanged as jest.Mock).mockImplementation((cb: any) => {
      cb(null); // No hay usuario
      return () => {};
    });

    render(<SessionGate>{mockChildren}</SessionGate>);
    expect(mockRouterReplace).toHaveBeenCalledWith("/login");
  });
});
