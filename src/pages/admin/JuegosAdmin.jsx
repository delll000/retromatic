import { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Button from "../../components/atoms/Button";
import GameModal from "../../components/organisms/GameModal";

const API_URL = "https://backend-retromatic.onrender.com/v1/api/juegos";

function JuegosAdmin() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modo, setModo] = useState("crear");
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const [eliminandoId, setEliminandoId] = useState(null);

  // cargar juegos
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setJuegos(data);
      } catch (e) {
        alert("Error al cargar juegos");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const abrirCrear = () => {
    setModo("crear");
    setJuegoEditando(null);
    setMostrarModal(true);
  };

  const abrirEditar = (juego) => {
    setModo("editar");
    setJuegoEditando(juego);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    if (guardando) return;
    setMostrarModal(false);
  };

  const guardarJuego = async (form) => {
    if (!form.titulo || !form.descripcion || !form.precio) {
      alert("Completa los campos obligatorios");
      return;
    }

    setGuardando(true);

    let categorias = [];
    if (form.categoriaIds.trim() !== "") {
      categorias = form.categoriaIds
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => !isNaN(n));
    }

    const body = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      urlPortada: form.urlPortada,
      clasificacionId: 1,
      categoriaIds: categorias,
      plataformaIds: [],
      modalidadIds: [],
      companiaIds: [],
    };

    try {
      let url = API_URL;
      let method = "POST";

      if (modo === "editar" && juegoEditando) {
        url = `${API_URL}/${juegoEditando.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // actualizar la listaaa
      if (modo === "crear") {
        setJuegos([...juegos, data]);
      } else {
        setJuegos(
          juegos.map((j) => (j.id === juegoEditando.id ? { ...j, ...data } : j))
        );
      }

      cerrarModal();
    } catch (e) {
      alert("Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarJuego = async (id) => {
    if (!confirm("¿Seguro?")) return;

    setEliminandoId(id);

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setJuegos(juegos.filter((j) => j.id !== id));
    } catch (e) {
      alert("Error al eliminar");
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="d-flex justify-content-between mb-4">
          <h1 className="h3">Gestión de juegos</h1>
          <Button variant="success" onClick={abrirCrear}>
            Crear juego
          </Button>
        </header>

        {cargando && <p>Cargando...</p>}

        <Row>
          <Col xs={12}>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {!cargando && juegos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No hay juegos registrados.
                    </td>
                  </tr>
                )}

                {juegos.map((j) => (
                  <tr key={j.id}>
                    <td>{j.id}</td>
                    <td>{j.titulo}</td>
                    <td>{j.descripcion}</td>
                    <td>${j.precio}</td>
                    <td className="d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => abrirEditar(j)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarJuego(j.id)}
                        disabled={eliminandoId === j.id}
                      >
                        {eliminandoId === j.id ? "..." : "Eliminar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <GameModal
          show={mostrarModal}
          onClose={cerrarModal}
          modo={modo}
          initialData={juegoEditando}
          onSubmit={guardarJuego}
          guardando={guardando}
        />
      </Container>
    </main>
  );
}

export default JuegosAdmin;
