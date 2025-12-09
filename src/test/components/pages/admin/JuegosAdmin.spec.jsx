import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import JuegosAdmin from "../../../../pages/admin/JuegosAdmin";

describe("JuegosAdmin", () => {
  beforeEach(() => {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  it("muestra el título y el botón de crear juego", async () => {
    render(<JuegosAdmin />);

    await waitFor(() =>
      expect(screen.getByText("Gestión de juegos")).toBeTruthy()
    );

    expect(
      screen.getByText("Listado y administración de juegos.")
    ).toBeTruthy();
    expect(screen.getByText("Crear juego")).toBeTruthy();
  });

  it("muestra la tabla con las columnas principales", async () => {
    render(<JuegosAdmin />);

    await waitFor(() => expect(screen.getByText("ID")).toBeTruthy());

    expect(screen.getByText("Título")).toBeTruthy();
    expect(screen.getByText("Descripción")).toBeTruthy();
    expect(screen.getByText("Precio")).toBeTruthy();
    expect(screen.getByText("Acciones")).toBeTruthy();
  });
});
