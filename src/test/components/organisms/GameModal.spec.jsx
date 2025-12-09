import React from "react";
import { render, screen } from "@testing-library/react";
import GameModal from "../../../components/organisms/GameModal";

describe("GameModal Component", () => {
  beforeEach(() => {
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
  });

  it('muestra el título "Crear Juego" cuando el modo es crear', () => {
    render(
      <GameModal
        show={true}
        modo="crear"
        initialData={null}
        onClose={() => {}}
        onSubmit={() => {}}
        guardando={false}
      />
    );

    expect(screen.getByText("Crear Juego")).toBeTruthy();
  });

  it("muestra el título con el id cuando el modo es editar", () => {
    const initialData = { id: 5 };

    render(
      <GameModal
        show={true}
        modo="editar"
        initialData={initialData}
        onClose={() => {}}
        onSubmit={() => {}}
        guardando={false}
      />
    );

    expect(screen.getByText("Editar Juego #5")).toBeTruthy();
  });
});
