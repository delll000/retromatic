import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-success text-white pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4">
          <Col lg={6} md={12} className="mb-3">
            <h5 className="fw-bold">Retromatic</h5>
            <p className="m-0">Tu página de juegos de confianza.</p>
          </Col>

          <Col lg={4} md={12}>
            <h5 className="fw-bold">Enlaces</h5>
            <ul className="list-unstyled m-0">
              <li className="mb-1">
                <a href="/catalogo" className="text-white text-decoration-none">
                  Catálogo
                </a>
              </li>
              <li className="mb-1">
                <a href="/us" className="text-white text-decoration-none">
                  Nosotros
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="/contact"
                  className="text-white text-decoration-none"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <small>© 2025 Retromatic SAS</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
