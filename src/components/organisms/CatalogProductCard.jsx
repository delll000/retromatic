import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function CatalogProductCard({ product, onClick }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    const guardado = localStorage.getItem("usuarioRetromatic");
    if (!guardado) {
      navigate("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(guardado);
    } catch {
      localStorage.removeItem("usuarioRetromatic");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/ventas/carrito/${user.id}/agregar/${product.id}`,
        { method: "POST" }
      );

      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "No se pudo agregar al carrito.");
        return;
      }

      alert("Juego agregado al carrito.");
    } catch {
      alert("Error al agregar al carrito.");
    }
  };

  return (
    <div
      className="card producto-card w-100"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <div
        className="card-image"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "200px",
        }}
      >
        <img
          src={product.imagen}
          alt={product.nombre}
          className="img-fluid h-100 w-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="card-content p-3">
        <p className="mb-1">{product.nombre}</p>
        <p className="mb-1 text-muted">{product.plataforma}</p>
        <p
          className="precio mb-3"
          style={{ fontWeight: "bold", color: "#2e7d32", fontSize: "18px" }}
        >
          ${product.precio}
        </p>

        <Button variant="success" className="w-100" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
}

export default CatalogProductCard;
