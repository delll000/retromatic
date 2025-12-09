import React from "react";
import { render, screen } from "@testing-library/react";
import ContactForm from "../../../components/organisms/ContactForm";

describe("ContactForm Component", () => {
  it("se renderiza mostrando los campos principales", () => {
    render(<ContactForm />);

    expect(screen.getByText("Nombre")).toBeTruthy();
    expect(screen.getByText("Correo electrónico")).toBeTruthy();
    expect(screen.getByText("Asunto")).toBeTruthy();
    expect(screen.getByText("Mensaje")).toBeTruthy();
    expect(screen.getByText("Enviar")).toBeTruthy();
  });
});
