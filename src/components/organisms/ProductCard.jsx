import React from "react";
import { Card } from "react-bootstrap";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import CardBody from "../molecules/CardBody";

function ProductCard({ product }) {
  return (
    <Card className="mb-4 product-card">
      <Image
        src={product.image}
        alt={product.name}
        className="product-card-img"
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <CardBody title={product.name} />
        <Button variant="success">¡Compra aquí!</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
