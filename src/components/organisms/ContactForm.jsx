import React, { useState } from "react";
import Button from "../atoms/Button";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El correo no es válido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es obligatorio";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      console.log("Errores en el formulario");
      return;
    }

    const mail = "ejemplo@retromatic.cl";
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.message}`
    );

    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          name="email"
          placeholder="tuemail@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
        />
        <small className="form-text text-muted">
          Nunca compartiremos tu correo con nadie ദ്ദി◝ ⩊ ◜.ᐟ.
        </small>
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="subject">Asunto</label>
        <input
          type="text"
          className={`form-control ${errors.subject ? "is-invalid" : ""}`}
          id="subject"
          name="subject"
          placeholder="Motivo del mensaje"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && (
          <div className="invalid-feedback">{errors.subject}</div>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="message">Mensaje</label>
        <textarea
          className={`form-control ${errors.message ? "is-invalid" : ""}`}
          id="message"
          name="message"
          rows="4"
          placeholder="Escribe tu mensaje aquí..."
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && (
          <div className="invalid-feedback">{errors.message}</div>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-100">
        Enviar
      </Button>
    </form>
  );
}

export default ContactForm;
