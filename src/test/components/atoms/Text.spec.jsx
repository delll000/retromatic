import React from "react";
import { render, screen } from "@testing-library/react";
import Text from "../../../components/atoms/Text";

describe("Text", () => {
  it("renderiza el texto correctamente", () => {
    render(<Text>Hola</Text>);
    expect(screen.getByText("Hola")).toBeTruthy();
  });
});
