import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../../../components/templates/RegisterForm";

describe("RegisterForm", () => {
  it("muestra algunos textos clave y el botón de crear cuenta", () => {
    render(<RegisterForm />);

    expect(screen.getByText("Nombre")).toBeTruthy();
    expect(screen.getByText("Apellido")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Confirmar email")).toBeTruthy();
    expect(screen.getByText("Región")).toBeTruthy();
    expect(screen.getByText("Comuna")).toBeTruthy();

    expect(screen.getByText("Crear cuenta")).toBeTruthy();
  });
});
