import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartSummary from "../../../components/organisms/CartSummary";

describe("CartSummary Component", () => {
  it("muestra los valores del resumen", () => {
    render(
      <CartSummary
        subtotal={10000}
        envio={2000}
        total={12000}
        onPay={() => {}}
      />
    );

    expect(screen.getByText("Resumen de compra")).toBeTruthy();
    expect(screen.getByText("Subtotal: $10000")).toBeTruthy();
    expect(screen.getByText("Envío: $2000")).toBeTruthy();
    expect(screen.getByText("Total: $12000")).toBeTruthy();
  });

  it("ejecuta la función onPay al hacer click en Proceder al pago", () => {
    const mockOnPay = jasmine.createSpy("onPay");

    render(
      <CartSummary
        subtotal={10000}
        envio={2000}
        total={12000}
        onPay={mockOnPay}
      />
    );

    const button = screen.getByText("Proceder al pago");
    fireEvent.click(button);

    expect(mockOnPay).toHaveBeenCalled();
  });
});
