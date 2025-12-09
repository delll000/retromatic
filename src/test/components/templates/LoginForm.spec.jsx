import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Forms from "../../../components/templates/LoginForm";

describe("Forms", () => {
  it("muestra un título y un texto cuando vienen en content", () => {
    const content = [
      { type: "title", text: "Formulario de prueba" },
      {
        type: "text",
        text: [
          {
            variant: "p",
            className: "text-muted",
            before: "",
            content: "Texto auxiliar",
            after: "",
          },
        ],
      },
    ];

    render(<Forms content={content} />);

    expect(screen.getByText("Formulario de prueba")).toBeTruthy();
    expect(screen.getByText("Texto auxiliar")).toBeTruthy();
  });

  it("renderiza un botón y ejecuta su onClick", () => {
    const onClick = jasmine.createSpy("onClick");

    const content = [
      {
        type: "button",
        text: "Enviar",
        onClick,
      },
    ];

    render(<Forms content={content} />);

    const button = screen.getByText("Enviar");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
