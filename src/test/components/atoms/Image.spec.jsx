import React from "react";
import { render, screen } from "@testing-library/react";
import Image from "../../../components/atoms/Image";

describe("Image", () => {
  it("se renderiza con el alt", () => {
    render(<Image src="https://example.com/foto.jpg" alt="mi foto" />);

    const img = screen.getByRole("img", { name: "mi foto" });
    expect(img).toBeTruthy();
  });

  it("usa el src entregado por props", () => {
    render(<Image src="https://example.com/foto.jpg" alt="otra foto" />);

    const img = screen.getByRole("img", { name: "otra foto" });
    expect(img.getAttribute("src")).toBe("https://example.com/foto.jpg");
  });
});
