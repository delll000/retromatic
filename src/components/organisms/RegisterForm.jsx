import { useState } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import Button from "../atoms/Button";

function RegisterForm() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true); 
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      
      <Row className="mb-3">

        <Form.Group as={Col} md="6">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" placeholder="Ingresar nombre" />
          <Form.Control.Feedback type="invalid">
            Ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Apellido</Form.Label>
          <Form.Control required type="text" placeholder="Ingresar apellido" />
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
            />
            <Form.Control.Feedback type="invalid">
              Ingresa un correo válido.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

      </Row>

      <Row className="mb-3">

        <Form.Group as={Col} md="6">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control required type="text" placeholder="Ciudad" />
          <Form.Control.Feedback type="invalid">
            Ingresa la ciudad.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Comuna</Form.Label>
          <Form.Control required type="text" placeholder="Comuna" />
          <Form.Control.Feedback type="invalid">
            Ingresa la comuna.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Row className="mb-3">

        <Form.Group as={Col} md="6">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required type="password" placeholder="Contraseña" />
          <Form.Control.Feedback type="invalid">
            Ingresa una contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control required type="tel" placeholder="Ej: 987654321" />
          <Form.Control.Feedback type="invalid">
            Ingresa un teléfono válido.
          </Form.Control.Feedback>
        </Form.Group>

      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Acepto los términos y condiciones"
          feedback="Debes aceptar antes de continuar."
          feedbackType="invalid"
        />
      </Form.Group>

      <div className="text-center">
        <Button type="submit" variant="primary">
          Crear cuenta
        </Button>
      </div>

    </Form>
  );
}

export default RegisterForm;
