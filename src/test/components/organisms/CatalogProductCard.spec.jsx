import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CatalogProductCard from "../../../components/organisms/CatalogProductCard";

describe("CatalogProductCard Component", () => {
  const product = {
    id: 1,
    nombre: "God of War",
    precio: 29990,
    imagen: "gow.jpg",
    plataforma: "PS5",
  };

  it("muestra el nombre, plataforma y precio del producto", () => {
    render(
      <BrowserRouter>
        <CatalogProductCard product={product} />
      </BrowserRouter>
    );

    expect(screen.getByText("God of War")).toBeTruthy();
    expect(screen.getByText("PS5")).toBeTruthy();
    expect(screen.getByText("$29990")).toBeTruthy();
  });

  it("ejecuta onClick al hacer click en la tarjeta", () => {
    const mockOnClick = jasmine.createSpy("onClick");

    render(
      <BrowserRouter>
        <CatalogProductCard product={product} onClick={mockOnClick} />
      </BrowserRouter>
    );

    const card = screen.getByText("God of War");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
