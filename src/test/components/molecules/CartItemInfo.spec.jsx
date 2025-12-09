import React from "react";
import { render, screen } from "@testing-library/react";
import CartItemInfo from "../../../components/molecules/CartItemInfo";

describe("CartItemInfo", () => {
  it("muestra nombre y precio", () => {
    render(<CartItemInfo name="Zelda" price={30000} />);
    expect(screen.getByText("Zelda")).toBeTruthy();
    expect(screen.getByText("$30000")).toBeTruthy();
  });
});
