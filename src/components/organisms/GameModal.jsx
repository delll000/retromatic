import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "../atoms/Button";

function GameModal({ show, onClose, modo, initialData, onSubmit, guardando }) {
  const estadoInicial = {
    titulo: "",
    descripcion: "",
    precio: "",
    urlPortada: "",
    categoriaIds: "",
  };

  const [form, setForm] = useState(estadoInicial);

  useEffect(() => {
    if (modo === "editar" && initialData) {
      setForm({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        precio: initialData.precio || "",
        urlPortada: initialData.urlPortada || "",
        categoriaIds: "",
      });
    } else {
      setForm(estadoInicial);
    }
  }, [modo, initialData, show]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

          <Form.Group>
            <Form.Label>Categorías (IDs separados por coma)</Form.Label>
            <Form.Control
              name="categoriaIds"
              value={form.categoriaIds}
              onChange={handleChange}
            />
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
