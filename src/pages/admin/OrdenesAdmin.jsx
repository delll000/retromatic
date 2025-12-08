import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function OrdenesAdmin() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/ventas/pagadas`);
        if (!res.ok) {
          setOrdenes([]);
          return;
        }
        const data = await res.json();
        setOrdenes(data);
      } catch {
        setOrdenes([]);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="mb-4">
          <h1 className="h3 mb-1">Órdenes</h1>
          <p className="text-muted mb-0">Listado de compras confirmadas.</p>
        </header>

        {cargando ? (
          <p>Cargando órdenes...</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Juegos</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Método de pago</th>
              </tr>
            </thead>

            <tbody>
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted">
                    No hay órdenes registradas.
                  </td>
                </tr>
              ) : (
                ordenes.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>

                    <td>
                      {o.usuario
                        ? `${o.usuario.nombre || ""} ${
                            o.usuario.apellido || ""
                          }`.trim()
                        : "Sin cliente"}
                    </td>

                    <td>
                      {o.juegos && Array.isArray(o.juegos)
                        ? o.juegos
                            .map(
                              (j) =>
                                `${j.juego?.titulo || "Juego"} x${j.cantidad}`
                            )
                            .join(", ")
                        : "Sin juegos"}
                    </td>

                    <td>${o.total}</td>

                    <td>{o.fechaHora ? o.fechaHora.split("T")[0] : "-"}</td>

                    <td>{o.estado?.nombre || "Sin estado"}</td>

                    <td>{o.metodoPago?.nombre || "Sin método"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </main>
  );
}

export default OrdenesAdmin;
