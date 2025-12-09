import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import Button from "../../components/atoms/Button";
import GameModal from "../../components/organisms/GameModal";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function JuegosAdmin() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modo, setModo] = useState("crear");
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState(null);

  const [searchTitulo, setSearchTitulo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroPlataforma, setFiltroPlataforma] = useState("");
  const [categoriaOptions, setCategoriaOptions] = useState([]);
  const [plataformaOptions, setPlataformaOptions] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/juegos`);
        const data = await res.json();
        setJuegos(data);

        const categoriasSet = new Set();
        const plataformasSet = new Set();

        data.forEach((j) => {
          (j.categorias || []).forEach((rel) => {
            if (rel.categoria?.nombre) categoriasSet.add(rel.categoria.nombre);
          });
          (j.plataformas || []).forEach((rel) => {
            if (rel.plataforma?.nombre)
              plataformasSet.add(rel.plataforma.nombre);
          });
        });

        setCategoriaOptions([...categoriasSet]);
        setPlataformaOptions([...plataformasSet]);
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

    const body = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      urlPortada: form.urlPortada,
      clasificacionId: form.clasificacionId
        ? Number(form.clasificacionId)
        : null,
      categoriaIds: form.categoriaIds || [],
      plataformaIds: form.plataformaIds || [],
      modalidadIds: form.modalidadIds || [],
      companiaIds: form.companiaIds || [],
    };

    try {
      let url = `${API_URL}/juegos`;
      let method = "POST";

      if (modo === "editar" && juegoEditando) {
        url = `${API_URL}/juegos/${juegoEditando.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Error al guardar");
        return;
      }

      let data = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (modo === "crear" && data) {
        setJuegos([...juegos, data]);
      } else if (modo === "editar") {
        setJuegos(
          juegos.map((j) =>
            j.id === juegoEditando.id ? { ...j, ...(data || body) } : j
          )
        );
      }

      cerrarModal();
    } catch {
      alert("Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const eliminarJuego = async (id) => {
    if (!confirm("¿Seguro?")) return;

    setEliminandoId(id);

    try {
      const res = await fetch(`${API_URL}/juegos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Error al eliminar");
        return;
      }
      setJuegos(juegos.filter((j) => j.id !== id));
    } catch (e) {
      alert("Error al eliminar");
    } finally {
      setEliminandoId(null);
    }
  };

  const juegosFiltrados = juegos.filter((j) => {
    const tituloMatch = j.titulo
      .toLowerCase()
      .includes(searchTitulo.toLowerCase());

    const categoriaMatch = filtroCategoria
      ? (j.categorias || []).some(
          (rel) => rel.categoria?.nombre === filtroCategoria
        )
      : true;

    const plataformaMatch = filtroPlataforma
      ? (j.plataformas || []).some(
          (rel) => rel.plataforma?.nombre === filtroPlataforma
        )
      : true;

    return tituloMatch && categoriaMatch && plataformaMatch;
  });

  return (
    <main className="py-5 bg-light">
      <Container>
        <header className="d-flex justify-content-between mb-4">
          <div>
            <h1 className="h3 mb-1">Gestión de juegos</h1>
            <p className="text-muted mb-0">
              Listado y administración de juegos.
            </p>
          </div>
          <Button variant="success" onClick={abrirCrear}>
            Crear juego
          </Button>
        </header>

        <Form className="mb-4">
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="searchTitulo">
                <Form.Label>Buscar por título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Buscar..."
                  value={searchTitulo}
                  onChange={(e) => setSearchTitulo(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="filtroCategoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  <option value="">Todas</option>
                  {categoriaOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="filtroPlataforma">
                <Form.Label>Plataforma</Form.Label>
                <Form.Select
                  value={filtroPlataforma}
                  onChange={(e) => setFiltroPlataforma(e.target.value)}
                >
                  <option value="">Todas</option>
                  {plataformaOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

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
                {!cargando && juegosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No hay juegos que coincidan con los filtros.
                    </td>
                  </tr>
                )}

                {juegosFiltrados.map((j) => (
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
