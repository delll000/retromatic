import React from "react";
import { render, screen } from "@testing-library/react";
import Us from "../../../pages/user/Us";

describe("Us Page", () => {
  it("se renderiza mostrando el logo y el título principal", () => {
    render(<Us />);

    expect(screen.getByAltText("Logo Retromatic")).toBeTruthy();
    expect(screen.getByText("¿Quiénes somos?")).toBeTruthy();
  });
});
