import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Catalogo from "../../../pages/user/Catalogo";

describe("Catalogo", () => {
  it("muestra el título del catálogo sin explotar dentro de un router", () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    expect(screen.getByText("Catálogo de Videojuegos")).toBeTruthy();
  });
});
