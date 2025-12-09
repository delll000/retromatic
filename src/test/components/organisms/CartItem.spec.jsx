import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../../../components/organisms/CartItem";

describe("CartItem", () => {
  const item = {
    juego: {
      titulo: "God of War",
      urlPortada: "gow.jpg",
    },
    precio: 29990,
    cantidad: 2,
  };

  it("muestra el nombre, el precio y la cantidad", () => {
    render(
      <CartItem
        item={item}
        index={0}
        onQuantityChange={() => {}}
        onRemove={() => {}}
      />
    );

    expect(screen.getByText("God of War")).toBeTruthy();
    expect(screen.getByText("$29990")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("llama a onQuantityChange al hacer click en +", () => {
    const mockOnQuantityChange = jasmine.createSpy("onQuantityChange");

    render(
      <CartItem
        item={item}
        index={0}
        onQuantityChange={mockOnQuantityChange}
        onRemove={() => {}}
      />
    );

    const botonMas = screen.getByText("+");
    fireEvent.click(botonMas);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(0, 1);
  });

  it("llama a onRemove al hacer click en Eliminar", () => {
    const mockOnRemove = jasmine.createSpy("onRemove");

    render(
      <CartItem
        item={item}
        index={0}
        onQuantityChange={() => {}}
        onRemove={mockOnRemove}
      />
    );

    const botonEliminar = screen.getByText("Eliminar");
    fireEvent.click(botonEliminar);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });
});
