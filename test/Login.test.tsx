import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "@/modules/auth/components/LoginGoogle";
import "@testing-library/jest-dom";

const pushMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      loginGoogle: "Iniciar sesión con Google",
    };
    return translations[key] || key;
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("@/features/users/auth", () => {
  return {
    loginWithPopup: jest.fn(() =>
      Promise.resolve({ uid: "123", name: "Brenda" })
    ),
  };
});

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Google login button", () => {
    render(<Login />);
    expect(screen.getByText("Iniciar sesión con Google")).toBeInTheDocument();
  });

  it("calls loginWithPopup and redirects on click", async () => {
    const { loginWithPopup } = jest.requireMock("@/features/users/auth");

    render(<Login />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(loginWithPopup).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("handles login error gracefully", async () => {
    const { loginWithPopup } = jest.requireMock("@/features/users/auth");
    loginWithPopup.mockImplementationOnce(() =>
      Promise.reject(new Error("Login failed"))
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<Login />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error al iniciar sesión:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
