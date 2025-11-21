import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartItem from '../../components/organisms/CartItem';
import CartSummary from '../../components/organisms/CartSummary';

function Cart() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = localStorage.getItem('carritoRetromatic');
    if (guardado) {
      try {
        setCarrito(JSON.parse(guardado));
      } catch (e) {
        console.error('Error parseando carrito:', e);
        setCarrito([]);
      }
    }
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carritoRetromatic', JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (index, suma) => {
    const copia = [...carrito];
    copia[index].cantidad += suma;

    if (copia[index].cantidad <= 0) {
      copia.splice(index, 1);
    }

    guardarCarrito(copia);
  };

  const eliminarItem = (index) => {
    const copia = [...carrito];
    copia.splice(index, 1);
    guardarCarrito(copia);
  };

  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const envio = carrito.length > 0 ? 4000 : 0;
  const total = subtotal + envio;

  const procesarPago = () => {
    alert('Pago procesado. ¡Gracias por tu compra!');
    guardarCarrito([]);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Tu carrito de compras</h1>

      <Row>
        <Col md={8}>
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                index={index}
                onQuantityChange={cambiarCantidad}
                onRemove={eliminarItem}
              />
            ))
          )}
        </Col>

        <Col md={4}>
          <CartSummary
            subtotal={subtotal}
            envio={envio}
            total={total}
            onPay={procesarPago}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
