import React from "react";
import { render } from "@testing-library/react";
import RetroCarousel from "../../../components/organisms/RetroCarousel";

describe("RetroCarousel", () => {
  it("se renderiza con un item mínimo", () => {
    const items = [{ id: 1, src: "https://example.com/img.jpg", alt: "img 1" }];

    const { container } = render(
      <RetroCarousel items={items} className="test-carousel" />
    );

    expect(container).toBeTruthy();
  });
});
