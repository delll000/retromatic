import React from "react";
import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "../atoms/Button";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function GameModal({ show, onClose, modo, initialData, onSubmit, guardando }) {
  const estadoInicial = {
    titulo: "",
    descripcion: "",
    precio: "",
    urlPortada: "",
    clasificacionId: "",
    categoriaIds: [],
    plataformaIds: [],
    modalidadIds: [],
    companiaIds: [],
  };

  const [form, setForm] = useState(estadoInicial);

  const [clasificaciones, setClasificaciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [companias, setCompanias] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resClas, resCat, resPlat, resMod, resComp] = await Promise.all([
          fetch(`${API_URL}/clasificaciones`),
          fetch(`${API_URL}/categorias`),
          fetch(`${API_URL}/plataformas`),
          fetch(`${API_URL}/modalidades`),
          fetch(`${API_URL}/compannias`),
        ]);

        const dataClas = await resClas.json();
        const dataCat = await resCat.json();
        const dataPlat = await resPlat.json();
        const dataMod = await resMod.json();
        const dataComp = await resComp.json();

        setClasificaciones(Array.isArray(dataClas) ? dataClas : []);
        setCategorias(Array.isArray(dataCat) ? dataCat : []);
        setPlataformas(Array.isArray(dataPlat) ? dataPlat : []);
        setModalidades(Array.isArray(dataMod) ? dataMod : []);
        setCompanias(Array.isArray(dataComp) ? dataComp : []);
      } catch {
        setClasificaciones([]);
        setCategorias([]);
        setPlataformas([]);
        setModalidades([]);
        setCompanias([]);
      }
    };

    if (show) {
      cargarDatos();
    }
  }, [show]);

  useEffect(() => {
    if (modo === "editar" && initialData) {
      setForm({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        precio: initialData.precio || "",
        urlPortada: initialData.urlPortada || "",
        clasificacionId: initialData.clasificacion?.id || "",
        categoriaIds: (initialData.categorias || [])
          .map((rel) => rel.categoria?.id)
          .filter(Boolean),
        plataformaIds: (initialData.plataformas || [])
          .map((rel) => rel.plataforma?.id)
          .filter(Boolean),
        modalidadIds: (initialData.modalidades || [])
          .map((rel) => rel.modalidad?.id)
          .filter(Boolean),
        companiaIds: (initialData.compannias || [])
          .map((rel) => rel.compannia?.id)
          .filter(Boolean),
      });
    } else {
      setForm(estadoInicial);
    }
  }, [modo, initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleMultiChange = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map((opt) => Number(opt.value));
    setForm({
      ...form,
      [name]: values,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!guardando}>
          <Modal.Title>
            {modo === "crear"
              ? "Crear Juego"
              : `Editar Juego #${initialData?.id}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL Portada</Form.Label>
            <Form.Control
              name="urlPortada"
              value={form.urlPortada}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Clasificación</Form.Label>
            <Form.Select
              name="clasificacionId"
              value={form.clasificacionId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona clasificación</option>
              {clasificaciones.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.codigo} ({c.edadMinima}+)
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categorías</Form.Label>
            <Form.Select
              multiple
              name="categoriaIds"
              value={form.categoriaIds.map(String)}
              onChange={handleMultiChange}
            >
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plataformas</Form.Label>
            <Form.Select
              multiple
              name="plataformaIds"
              value={form.plataformaIds.map(String)}
              onChange={handleMultiChange}
            >
              {plataformas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modalidades</Form.Label>
            <Form.Select
              multiple
              name="modalidadIds"
              value={form.modalidadIds.map(String)}
              onChange={handleMultiChange}
            >
              {modalidades.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Compañías</Form.Label>
            <Form.Select
              multiple
              name="companiaIds"
              value={form.companiaIds.map(String)}
              onChange={handleMultiChange}
            >
              {companias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={guardando}>
            Cancelar
          </Button>

          <Button variant="primary" type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GameModal;
