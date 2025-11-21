import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import CartItemInfo from '../molecules/CartItemInfo';
import Button from '../atoms/Button';

function CartItem({ item, index, onQuantityChange, onRemove }) {
  return (
    <Card className="mb-3 cart-item-card">
      <Card.Body className="d-flex">
        <div className="me-3 cart-item-image-wrapper">
          <Image
            src={item.imagen}
            alt={item.nombre}
            className="cart-item-image"
          />
        </div>

        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <div>
            <CartItemInfo name={item.nombre} price={item.precio} />
          </div>

          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => onQuantityChange(index, -1)}
              >
                -
              </Button>
              <span className="mx-2">{item.cantidad}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => onQuantityChange(index, 1)}
              >
                +
              </Button>
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemove(index)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
