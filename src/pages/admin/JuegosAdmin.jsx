import { useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Button from '../../components/atoms/Button'

const initialJuegos = [
  { id: 1, nombre: 'Minecraft', descripcion: 'Construcción y aventura', precio: 19990 },
  { id: 2, nombre: 'God of War Ragnarok', descripcion: 'Acción y aventura', precio: 49990 },
  { id: 3, nombre: 'Metal Gear Solid 2', descripcion: 'Acción táctica', precio: 14990 },
]

function JuegosAdmin() {
  const [juegos] = useState(initialJuegos)

  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-1">Gestión de juegos</h1>
            <p className="text-muted mb-0">
              Aquí podrás revisar y administrar los juegos del catálogo.
            </p>
          </div>
          <Button variant="success">
            Crear juego (próximamente)
          </Button>
        </header>

        <Row>
          <Col xs={12}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {juegos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No hay juegos registrados.
                    </td>
                  </tr>
                ) : (
                  juegos.map((juego) => (
                    <tr key={juego.id}>
                      <td>{juego.id}</td>
                      <td>{juego.nombre}</td>
                      <td>{juego.descripcion}</td>
                      <td>${juego.precio}</td>
                      <td className="d-flex gap-2">
                        <Button variant="primary">
                          Editar
                        </Button>
                        <Button variant="danger">
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default JuegosAdmin
