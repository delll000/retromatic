import { Container } from "react-bootstrap";
import Image from "../../components/atoms/Image";
import RegisterForm from "../../components/organisms/RegisterForm";

function Register() {
  return (
    <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="p-4 mt-5" style={{ maxWidth: "600px", width: "100%" }}>
        
        <div className="text-center mb-4">
          <Image
            src="public\img\logo\Logo3.webp"
            alt="Retromatic Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "140px" }}
          />
          <h1 className="h3">Crea tu cuenta en Retromatic</h1>
        </div>

        <RegisterForm />

        <p className="text-center mt-3">
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>

      </div>
    </Container>
  );
}

export default Register;
