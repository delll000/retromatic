import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../../../components/organisms/NavBar";

describe("NavBar", () => {
  it("muestra el logo, los enlaces principales y login", () => {
    render(<NavBar />);

    expect(screen.getByAltText("Retromatic Logo")).toBeTruthy();
    expect(screen.getByText("Catálogo")).toBeTruthy();
    expect(screen.getByText("Nosotros")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });
});
