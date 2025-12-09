import React from "react";
import { render, screen } from "@testing-library/react";
import HomeAdmin from "../../../../pages/admin/HomeAdmin";

describe("HomeAdmin", () => {
  it("se renderiza mostrando los títulos principales", () => {
    render(<HomeAdmin />);

    expect(screen.getByText("Panel de administración")).toBeTruthy();
    expect(
      screen.getByText("Gestiona el catálogo y las órdenes del sistema.")
    ).toBeTruthy();
  });

  it("muestra la sección de juegos con su botón", () => {
    render(<HomeAdmin />);

    expect(screen.getByText("Juegos")).toBeTruthy();
    expect(
      screen.getByText("Administra el catálogo de videojuegos.")
    ).toBeTruthy();
    expect(screen.getByText("Gestionar juegos")).toBeTruthy();
  });

  it("muestra la sección de órdenes con su botón", () => {
    render(<HomeAdmin />);

    expect(screen.getByText("Órdenes")).toBeTruthy();
    expect(screen.getByText("Revisa las compras registradas.")).toBeTruthy();
    expect(screen.getByText("Ver órdenes")).toBeTruthy();
  });
});
