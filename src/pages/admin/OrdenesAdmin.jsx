import { Container, Table } from "react-bootstrap";

const ordenesEjemplo = [
  {
    id: 1,
    cliente: "Juan Pérez",
    juego: "Minecraft",
    total: 19990,
    estado: "Completada",
  },
  {
    id: 2,
    cliente: "Ana López",
    juego: "God of War Ragnarok",
    total: 49990,
    estado: "Pendiente",
  },
];

function OrdenesAdmin() {
  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="mb-4">
          <h1 className="h3 mb-1">Órdenes</h1>
          <p className="text-muted mb-0">
            Listado de órdenes registradas en la tienda.
          </p>
        </header>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Juego</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenesEjemplo.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay órdenes registradas.
                </td>
              </tr>
            ) : (
              ordenesEjemplo.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>{orden.cliente}</td>
                  <td>{orden.juego}</td>
                  <td>${orden.total}</td>
                  <td>{orden.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </main>
  );
}

export default OrdenesAdmin;
