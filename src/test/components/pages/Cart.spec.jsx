import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "../../../pages/user/Cart";
import { MemoryRouter } from "react-router-dom";

describe("Cart", () => {
  it("muestra el título del carrito", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Tu carrito de compras")).toBeTruthy();
  });
});
