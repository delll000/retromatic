import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/atoms/Button";

function HomeAdmin() {
  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="text-center mb-5">
          <h1 className="fw-bold">Panel de administración</h1>
          <p className="text-muted">
            Gestiona el catálogo, las órdenes y los contenidos destacados.
          </p>
        </header>

        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="admin-card p-4 bg-white shadow-sm rounded text-center h-100 d-flex flex-column">
              <div className="mb-3">
                <i
                  className="bi bi-controller"
                  style={{ fontSize: "42px", color: "#2e7d32" }}
                ></i>
              </div>
              <h4 className="fw-semibold">Juegos</h4>
              <p className="text-muted mb-4">
                Administra el catálogo de videojuegos.
              </p>
              <Button
                variant="success"
                href="/admin/juegos"
                className="mt-auto"
              >
                Gestionar juegos
              </Button>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="admin-card p-4 bg-white shadow-sm rounded text-center h-100 d-flex flex-column">
              <div className="mb-3">
                <i
                  className="bi bi-receipt"
                  style={{ fontSize: "42px", color: "#2e7d32" }}
                ></i>
              </div>
              <h4 className="fw-semibold">Órdenes</h4>
              <p className="text-muted mb-4">Revisa las compras registradas.</p>
              <Button
                variant="success"
                href="/admin/ordenes"
                className="mt-auto"
              >
                Ver órdenes
              </Button>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="admin-card p-4 bg-white shadow-sm rounded text-center h-100 d-flex flex-column">
              <div className="mb-3">
                <i
                  className="bi bi-images"
                  style={{ fontSize: "42px", color: "#2e7d32" }}
                ></i>
              </div>
              <h4 className="fw-semibold">Homepage</h4>
              <p className="text-muted mb-4">
                Configura el carrusel y juegos destacados.
              </p>
              <Button
                variant="success"
                href="/admin/home-config"
                className="mt-auto"
              >
                Editar homepage
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default HomeAdmin;
