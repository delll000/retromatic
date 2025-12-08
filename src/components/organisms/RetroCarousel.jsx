import React from "react";
import { Carousel as BsCarousel } from "react-bootstrap";
import Image from "../atoms/Image";

function RetroCarousel({ items, className }) {
  return (
    <BsCarousel className={className}>
      {items.map((item) => (
        <BsCarousel.Item
          key={item.id || item.alt}
          interval={item.interval ?? 4500}
        >
          <Image
            src={item.src}
            alt={item.alt}
            className={item.className || "d-block w-100"}
            id={item.imgId}
          />
        </BsCarousel.Item>
      ))}
    </BsCarousel>
  );
}

export default RetroCarousel;
