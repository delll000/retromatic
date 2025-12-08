import { Container } from "react-bootstrap";
import Button from "../../components/atoms/Button";

function HomeConfig() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        className="text-center bg-white p-5 rounded shadow"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="mb-3">En construcción</h1>
        <p className="text-muted mb-4">
          ( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙
          ) <strong>Esta sección estará disponible pronto!!!!!!!</strong>( ദ്ദി
          ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )( ദ്ദി ˙ᗜ˙ )
        </p>

        <Button variant="success" href="/admin">
          Volver al panel
        </Button>
      </Container>
    </div>
  );
}

export default HomeConfig;
