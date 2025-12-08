import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/atoms/Button";

function HomeAdmin() {
  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="text-center mb-4">
          <h1>Panel de administración</h1>
          <p className="text-muted">
            Desde aquí podrás gestionar los juegos, las órdenes y el contenido
            de la página principal.
          </p>
        </header>

        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="p-4 bg-white shadow-sm rounded h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="mb-2">Juegos</h4>
                <p className="text-muted mb-3">
                  Ver y administrar los juegos del catálogo.
                </p>
              </div>
              <Button variant="success" href="/admin/juegos">
                Gestionar juegos
              </Button>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 bg-white shadow-sm rounded h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="mb-2">Órdenes</h4>
                <p className="text-muted mb-3">
                  Revisar las órdenes realizadas por los clientes.
                </p>
              </div>
              <Button variant="primary" href="/admin/ordenes">
                Ver órdenes
              </Button>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 bg-white shadow-sm rounded h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="mb-2">Homepage</h4>
                <p className="text-muted mb-3">
                  Editar el carrusel y la selección de juegos del mes.
                </p>
              </div>
              <Button variant="secondary" href="/admin/home-config">
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
