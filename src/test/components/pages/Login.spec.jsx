import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../pages/auth/Login";

describe("Login Page", () => {
  it("muestra los campos de correo, contraseña y el botón de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
    expect(screen.getByLabelText("Contraseña")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeTruthy();
  });
});
