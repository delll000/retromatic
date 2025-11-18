import { Navbar, Nav, Container } from 'react-bootstrap'

function NavBar() {
  return (
    <header>
      <Navbar bg="white" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/public/img/Logo/Logo3.webp"
              alt="Retromatic Logo"
              style={{ height: '50px' }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link href="/catalogo">Catálogo</Nav.Link>
              <Nav.Link href="/nosotros">Nosotros</Nav.Link>
              <Nav.Link href="/contacto">Contacto</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/carrito">
                <i className="material-icons">shopping_cart</i>
              </Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default NavBar
