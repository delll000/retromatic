import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/organisms/Footer";

describe("Footer", () => {
  it("se renderiza sin errores", () => {
    const { container } = render(<Footer />);
    expect(container).toBeTruthy();
  });

  it("muestra el nombre de la tienda", () => {
    render(<Footer />);
    expect(screen.getByText("Retromatic")).toBeTruthy();
  });

  it("muestra los enlaces principales", () => {
    render(<Footer />);

    expect(screen.getByText("Catálogo")).toBeTruthy();
    expect(screen.getByText("Nosotros")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
  });

  it("muestra el texto de derechos de autor", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025 Retromatic SAS")).toBeTruthy();
  });
});
