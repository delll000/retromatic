import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../../../components/organisms/ProductCard";

describe("ProductCard", () => {
  it("se renderiza mostrando el nombre, la imagen y el botón", () => {
    const product = {
      name: "Juego de Prueba",
      image: "ejemplo.jpg",
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText("Juego de Prueba")).toBeTruthy();
    expect(screen.getByRole("img", { name: "Juego de Prueba" })).toBeTruthy();
    expect(screen.getByText("¡Compra aquí!")).toBeTruthy();
  });
});
