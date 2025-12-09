import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import OrdenesAdmin from "../../../../pages/admin/OrdenesAdmin";

describe("OrdenesAdmin", () => {
  beforeEach(() => {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  it("muestra el título y el subtítulo de órdenes", async () => {
    render(<OrdenesAdmin />);

    await waitFor(() => expect(screen.getByText("Órdenes")).toBeTruthy());

    expect(screen.getByText("Listado de compras confirmadas.")).toBeTruthy();
  });

  it("muestra la tabla con las columnas principales y mensaje vacío", async () => {
    render(<OrdenesAdmin />);

    await waitFor(() => expect(screen.getByText("ID")).toBeTruthy());

    expect(screen.getByText("Cliente")).toBeTruthy();
    expect(screen.getByText("Juegos")).toBeTruthy();
    expect(screen.getByText("Total")).toBeTruthy();
    expect(screen.getByText("Fecha")).toBeTruthy();
    expect(screen.getByText("Estado")).toBeTruthy();
    expect(screen.getByText("Método de pago")).toBeTruthy();
    expect(screen.getByText("No hay órdenes registradas.")).toBeTruthy();
  });
});
