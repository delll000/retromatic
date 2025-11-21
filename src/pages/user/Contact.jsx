import React from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../../components/organisms/ContactForm";

function Contact() {
  return (
    <Container className="my-5">
      <h1>Contacto</h1>
      <p>Déjanos tu mensaje y te responderemos pronto.</p>
      <ContactForm />
    </Container>
  );
}

export default Contact;
