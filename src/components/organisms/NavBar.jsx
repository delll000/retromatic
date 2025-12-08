import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
  const [user, setUser] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem("usuarioRetromatic");
    if (guardado) {
      try {
        setUser(JSON.parse(guardado));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioRetromatic");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header>
      <Navbar bg="white" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/Logo3.webp"
              alt="Retromatic Logo"
              style={{ height: "50px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link href="/catalogo">Catálogo</Nav.Link>
              <Nav.Link href="/us">Nosotros</Nav.Link>
              <Nav.Link href="/contact">Contacto</Nav.Link>
            </Nav>

            <Nav className="position-relative d-flex align-items-center">
              <Nav.Link href="/cart" className="d-flex align-items-center">
                <i className="bi bi-cart" style={{ fontSize: "22px" }}></i>
              </Nav.Link>

              {!user ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <div
                  className="position-relative d-flex align-items-center"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={{ cursor: "pointer" }}
                >
                  <Nav.Link as="span" className="d-flex align-items-center">
                    {user.nombre}
                  </Nav.Link>

                  {hover && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "38px",
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        padding: "8px 0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 50,
                        minWidth: "170px",
                      }}
                    >
                      {user.rol === "ADMIN" && (
                        <div
                          style={{
                            padding: "8px 15px",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                          onClick={() => (window.location.href = "/admin")}
                        >
                          Admin dashboard
                        </div>
                      )}

                      <div
                        style={{
                          padding: "8px 15px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
