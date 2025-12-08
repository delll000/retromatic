import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../../../components/atoms/Button";

describe("Button", () => {
  it("muestra el texto que recibe", () => {
    render(<Button>Agregar</Button>);
    expect(screen.getByText("Agregar")).toBeTruthy();
  });

  it("respeta la clase que se le pasa", () => {
    render(<Button className="mi-clase">Click</Button>);
    const btn = screen.getByText("Click");
    expect(btn).toHaveClass("mi-clase");
  });
});
