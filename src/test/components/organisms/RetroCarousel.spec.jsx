import React from "react";
import { render, screen } from "@testing-library/react";
import RetroCarousel from "../../../components/organisms/RetroCarousel";

describe("RetroCarousel", () => {
  it("se renderiza con un item mínimo", () => {
    const items = [{ id: 1, src: "ejemplo.jpg", alt: "img 1" }];

    render(<RetroCarousel items={items} className="test-carousel" />);
    const img = screen.getByRole("img", { name: "img 1" });
    expect(img).toBeTruthy();
  });
});
