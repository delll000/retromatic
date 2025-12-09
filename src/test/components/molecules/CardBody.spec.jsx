import React from "react";
import { render, screen } from "@testing-library/react";
import CardBody from "../../../components/molecules/CardBody";

describe("CardBody", () => {
  it("muestra el título recibido por props", () => {
    render(<CardBody title="Juego 1" />);
    expect(screen.getByText("Juego 1")).toBeTruthy();
  });
});
