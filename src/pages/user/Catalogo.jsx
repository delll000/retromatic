import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button as BsButton,
  Modal,
} from "react-bootstrap";
import CatalogProductCard from "../../components/organisms/CatalogProductCard";

const API_URL = "https://backend-retromatic.onrender.com/v1/api";

function Catalogo() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const resJuegos = await fetch(`${API_URL}/juegos`);
        const juegosData = await resJuegos.json();

        const mapped = juegosData.map((j) => ({
          id: j.id,
          nombre: j.titulo,
          descripcion: j.descripcion,
          precio: j.precio,
          imagen: j.urlPortada,

          categorias: (j.categorias || [])
            .map((rel) => rel.categoria?.nombre)
            .filter(Boolean),

          plataformas: (j.plataformas || [])
            .map((rel) => rel.plataforma?.nombre)
            .filter(Boolean),
        }));

        setAllProducts(mapped);
        setProducts(mapped);

        const resCats = await fetch(`${API_URL}/categorias`);
        const catsData = await resCats.json();
        setCategoryOptions(catsData.map((c) => c.nombre));

        const plSet = new Set();
        mapped.forEach((j) => j.plataformas.forEach((p) => plSet.add(p)));
        setPlatformOptions([...plSet]);
      } catch (e) {
        setError("No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      result = result.filter((p) => p.nombre.toLowerCase().includes(term));
    }

    if (category) {
      result = result.filter((p) => p.categorias.includes(category));
    }

    if (platform) {
      result = result.filter((p) => p.plataformas.includes(platform));
    }

    setProducts(result);
  }, [search, category, platform, allProducts]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    const stored = JSON.parse(
      localStorage.getItem("carritoRetromatic") || "[]"
    );
    const existing = stored.find((i) => i.id === selectedProduct.id);

    if (existing) {
      existing.cantidad += quantity;
    } else {
      stored.push({
        id: selectedProduct.id,
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        imagen: selectedProduct.imagen,
        cantidad: quantity,
      });
    }

    localStorage.setItem("carritoRetromatic", JSON.stringify(stored));
    handleCloseModal();
  };

  return (
    <main>
      <section className="py-5">
        <Container>
          <h2 className="mb-4 text-center">Catálogo de Videojuegos</h2>

          {loading && <p className="text-center">Cargando juegos...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          <Form className="mb-4">
            <Row className="g-3 align-items-end">
              <Col xs={12} md={6}>
                <Form.Group controlId="search">
                  <Form.Label>Buscar juego</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buscar juego..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group controlId="categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={3}>
                <Form.Group controlId="plataforma">
                  <Form.Label>Plataforma</Form.Label>
                  <Form.Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {platformOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} md={3} className="d-flex mb-4">
                <CatalogProductCard
                  product={product}
                  onClick={() => handleOpenModal(product)}
                />
              </Col>
            ))}

            {!loading && !error && products.length === 0 && (
              <p className="text-center mt-4">No se encontraron juegos.</p>
            )}
          </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xs={12} md={6}>
                  <img
                    src={selectedProduct.imagen}
                    alt={selectedProduct.nombre}
                    className="img-fluid"
                  />
                </Col>

                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <p>{selectedProduct.descripcion}</p>
                  <p className="fw-bold">${selectedProduct.precio}</p>

                  <p>
                    <strong>Categorías:</strong>
                    {selectedProduct.categorias.length > 0
                      ? selectedProduct.categorias.join(", ")
                      : "Sin categoría"}
                  </p>

                  <p>
                    <strong>Plataformas:</strong>
                    {selectedProduct.plataformas.length > 0
                      ? selectedProduct.plataformas.join(", ")
                      : "Sin plataforma"}
                  </p>

                  <Form.Group controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value) || 1))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <BsButton variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </BsButton>
              <BsButton variant="success" onClick={handleAddToCart}>
                Agregar al carrito
              </BsButton>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </main>
  );
}

export default Catalogo;
