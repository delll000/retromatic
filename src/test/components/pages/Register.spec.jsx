import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../../../pages/user/Register";

describe("Register Page", () => {
  it("muestra el logo y el formulario de registro", () => {
    render(<Register />);

    expect(screen.getByAltText("Retromatic Logo")).toBeTruthy();
    expect(screen.getByText("Crea tu cuenta en Retromatic")).toBeTruthy();
    expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeTruthy();
  });
});
