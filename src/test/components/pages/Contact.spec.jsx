import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../../../pages/user/Contact";

describe("Contact Page", () => {
  it("muestra el título y el formulario de contacto", () => {
    render(<Contact />);

    expect(screen.getByText("Contacto")).toBeTruthy();
    expect(
      screen.getByText("Déjanos tu mensaje y te responderemos pronto.")
    ).toBeTruthy();
  });
});
