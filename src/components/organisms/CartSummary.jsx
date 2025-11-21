import Button from '../atoms/Button';
import Text from '../atoms/Text';

function CartSummary({ subtotal, envio, total, onPay }) {
  return (
    <div className="p-3 border rounded">
      <Text variant="h4">Resumen de compra</Text>

      <hr />

      <Text>Subtotal: ${subtotal}</Text>
      <Text>Envío: ${envio}</Text>
      <Text variant="h5">
        <strong>Total: ${total}</strong>
      </Text>

      <Button
        variant="success"
        className="w-100 mt-3"
        disabled={total === 0}
        onClick={onPay}
      >
        Proceder al pago
      </Button>

      <Button
        variant="link"
        className="w-100"
        href="/catalogo"
      >
        Seguir comprando
      </Button>
    </div>
  );
}

export default CartSummary;
