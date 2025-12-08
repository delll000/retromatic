import { useState } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import Button from "../atoms/Button";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function RegisterForm() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regionSeleccionada, setRegionSeleccionada] = useState("");

  const regiones = [
    { id: 1, nombre: "Región Metropolitana" },
    { id: 2, nombre: "Valparaíso" },
    { id: 3, nombre: "Biobío" },
  ];

  const comunas = [
    { id: 1, regionId: 1, nombre: "Maipú" },
    { id: 2, regionId: 1, nombre: "Cerrillos" },
    { id: 3, regionId: 1, nombre: "Pudahuel" },
    { id: 4, regionId: 2, nombre: "Valparaíso" },
    { id: 5, regionId: 2, nombre: "Viña del Mar" },
    { id: 6, regionId: 3, nombre: "Concepción" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const fd = new FormData(form);

    const correo = (fd.get("correo") || "").trim();
    const correo2 = (fd.get("correo2") || "").trim();
    const contrasenna = fd.get("contrasena") || "";
    const contrasenna2 = fd.get("contrasena2") || "";

    const errores = [];

    if (
      correo === "" ||
      correo.length > 100 ||
      !(
        correo.endsWith("@duoc.cl") ||
        correo.endsWith("@profesor.duoc.cl") ||
        correo.endsWith("@gmail.com")
      )
    ) {
      errores.push(
        "Ingrese un correo válido. Debe terminar en @duoc.cl / @profesor.duoc.cl / @gmail.com"
      );
    }

    if (correo !== correo2) {
      errores.push("Ambos correos deben ser idénticos para confirmar");
    }

    if (
      contrasenna === "" ||
      contrasenna.length < 4 ||
      contrasenna.length > 10
    ) {
      errores.push("La contraseña debe tener entre 4 y 10 caracteres");
    }

    if (contrasenna !== contrasenna2) {
      errores.push("Las contraseñas deben ser idénticas para confirmarse");
    }

    if (!fd.get("regionId")) {
      errores.push("Selecciona una región");
    }

    if (!fd.get("comunaId")) {
      errores.push("Selecciona una comuna");
    }

    if (
      !fd.get("nombre") ||
      !fd.get("apellido") ||
      !fd.get("direccion") ||
      !fd.get("telefono")
    ) {
      errores.push("Completa todos los campos obligatorios");
    }

    if (errores.length > 0) {
      alert(errores.join("\n"));
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    const body = {
      nombre: fd.get("nombre"),
      apellido: fd.get("apellido"),
      correo: correo,
      contrasenna: contrasenna,
      regionId: Number(fd.get("regionId")),
      comunaId: Number(fd.get("comunaId")),
      direccion: fd.get("direccion"),
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "Error al crear la cuenta.");
      } else {
        alert("Cuenta creada correctamente.");
        form.reset();
        setValidated(false);
        setRegionSeleccionada("");
      }
    } catch {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const comunasFiltradas = comunas.filter(
    (c) => c.regionId === Number(regionSeleccionada)
  );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingresar nombre"
            name="nombre"
          />
          <Form.Control.Feedback type="invalid">
            Ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingresar apellido"
            name="apellido"
          />
          <Form.Control.Feedback type="invalid">
            Ingresa tu apellido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              required
              type="email"
              placeholder="correo@ejemplo.com"
              name="correo"
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un correo válido.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Confirmar email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Repite tu correo"
            name="correo2"
          />
          <Form.Control.Feedback type="invalid">
            Confirma tu correo.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Región</Form.Label>
          <Form.Select
            required
            name="regionId"
            value={regionSeleccionada}
            onChange={(e) => setRegionSeleccionada(e.target.value)}
          >
            <option value="" disabled>
              Selecciona región
            </option>
            {regiones.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Selecciona la región.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Comuna</Form.Label>
          <Form.Select required name="comunaId" disabled={!regionSeleccionada}>
            <option value="" disabled>
              Selecciona comuna
            </option>
            {comunasFiltradas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Selecciona la comuna.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ej: Calle 123"
            name="direccion"
          />
          <Form.Control.Feedback type="invalid">
            Ingresa una dirección válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            name="contrasena"
          />
          <Form.Control.Feedback type="invalid">
            Ingresa una contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Ej: 987654321"
            name="telefono"
          />
          <Form.Control.Feedback type="invalid">
            Ingresa un teléfono válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Repite tu contraseña"
            name="contrasena2"
          />
          <Form.Control.Feedback type="invalid">
            Confirma tu contraseña.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Acepto los términos y condiciones"
          feedback="Debes aceptar antes de continuar."
          feedbackType="invalid"
          name="terminos"
        />
      </Form.Group>

      <div className="text-center">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
