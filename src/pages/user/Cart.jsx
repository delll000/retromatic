import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/organisms/CartItem";
import CartSummary from "../../components/organisms/CartSummary";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function Cart() {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState({ juegos: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarCarrito = async (usuarioId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/ventas/carrito/${usuarioId}`);
      if (!response.ok) {
        setCarrito({ juegos: [], total: 0 });
        return;
      }
      const data = await response.json();
      setCarrito(data || { juegos: [], total: 0 });
    } catch {
      setCarrito({ juegos: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const guardado = localStorage.getItem("usuarioRetromatic");
    if (!guardado) {
      navigate("/login");
      return;
    }
    try {
      const usuario = JSON.parse(guardado);
      setUser(usuario);
      cargarCarrito(usuario.id);
    } catch {
      localStorage.removeItem("usuarioRetromatic");
      navigate("/login");
    }
  }, [navigate]);

  const cambiarCantidad = async (index, suma) => {
    const item = carrito.juegos[index];
    if (!user || !item) return;

    const ventaJuegoId = item.id;
    const juegoId = item.juego?.id;

    try {
      if (suma > 0 && juegoId) {
        await fetch(`${API_URL}/ventas/carrito/${user.id}/agregar/${juegoId}`, {
          method: "POST",
        });
      } else if (suma < 0 && ventaJuegoId) {
        await fetch(
          `${API_URL}/ventas/carrito/${user.id}/item/${ventaJuegoId}/decrementar`,
          {
            method: "POST",
          }
        );
      }
      await cargarCarrito(user.id);
    } catch {
      alert("No se pudo actualizar la cantidad.");
    }
  };

  const eliminarItem = async (index) => {
    const item = carrito.juegos[index];
    if (!user || !item) return;

    const ventaJuegoId = item.id;

    try {
      await fetch(`${API_URL}/ventas/carrito/${user.id}/item/${ventaJuegoId}`, {
        method: "DELETE",
      });
      await cargarCarrito(user.id);
    } catch {
      alert("No se pudo eliminar el juego del carrito.");
    }
  };

  const vaciarCarrito = async () => {
    if (!user) return;
    try {
      await fetch(`${API_URL}/ventas/carrito/${user.id}`, { method: "DELETE" });
      await cargarCarrito(user.id);
    } catch {
      alert("No se pudo vaciar el carrito.");
    }
  };

  const procesarPago = async () => {
    if (!user) return;
    const metodoPagoId = 1;

    try {
      const response = await fetch(
        `${API_URL}/ventas/carrito/${user.id}/confirmar/${metodoPagoId}`,
        { method: "POST" }
      );

      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "No se pudo procesar el pago.");
        return;
      }

      alert("Pago procesado. ¡Gracias por tu compra!");
      await cargarCarrito(user.id);
    } catch {
      alert("Error al procesar el pago.");
    }
  };

  const juegos = carrito.juegos || [];
  const subtotal = carrito.total || 0;
  const envio = juegos.length > 0 ? 4000 : 0;
  const total = subtotal + envio;

  return (
    <Container className="my-5">
      <h1 className="mb-4">Tu carrito de compras</h1>

      {loading ? (
        <p>Cargando carrito...</p>
      ) : (
        <Row>
          <Col md={8}>
            {juegos.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              juegos.map((item, index) => (
                <CartItem
                  key={item.id}
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
              onClear={vaciarCarrito}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;
