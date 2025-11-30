import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button as BsButton, Modal } from 'react-bootstrap'
import CatalogProductCard from '../../components/organisms/CatalogProductCard'

const API_URL = 'https://backend-retromatic.onrender.com/v1/api'

function Catalogo() {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [platform, setPlatform] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

   useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_URL}/juegos`)
        if (!response.ok) {
          throw new Error('No se pudieron cargar los juegos')
        }

        const data = await response.json()

        const mapped = data.map((juego) => ({
          id: juego.id,
          nombre: juego.titulo,
          descripcion: juego.descripcion,
          precio: juego.precio,
          imagen: juego.urlPortada,
          categoria:
            juego.categorias && juego.categorias.length > 0
              ? juego.categorias[0].nombre
              : 'Sin categoría',
          plataforma:
            juego.plataformas && juego.plataformas.length > 0
              ? juego.plataformas[0].nombre
              : 'Sin plataforma',
        }))

        setAllProducts(mapped)
        setProducts(mapped)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  useEffect(() => {
    let result = [...allProducts]

    if (search.trim() !== '') {
      const term = search.toLowerCase()
      result = result.filter((p) => p.nombre.toLowerCase().includes(term))
    }

    if (category) {
      result = result.filter((p) => p.categoria === category)
    }

    if (platform) {
      result = result.filter((p) => p.plataforma === platform)
    }

    setProducts(result)
  }, [search, category, platform, allProducts])

  const handleOpenModal = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleAddToCart = () => {
    if (!selectedProduct) return

    const stored = JSON.parse(localStorage.getItem('carritoRetromatic') || '[]')
    const existing = stored.find((item) => item.id === selectedProduct.id)

    if (existing) {
      existing.cantidad += quantity
    } else {
      stored.push({
        id: selectedProduct.id,
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        imagen: selectedProduct.imagen,
        cantidad: quantity,
      })
    }

    localStorage.setItem('carritoRetromatic', JSON.stringify(stored))
    handleCloseModal()
  }

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
                <Form.Group controlId="buscador">
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
                    <option value="aventura">Aventura</option>
                    <option value="accion">Acción</option>
                    <option value="Pelea">Pelea</option>
                    <option value="Terror Shooter">Terror Shooter</option>
                    <option value="Correr">Correr</option>
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
                    <option value="PS5">PS5</option>
                    <option value="PS4">PS4</option>
                    <option value="PS2">PS2</option>
                    <option value="Multiplataforma">Multiplataforma</option>
                    <option value="Dreamcast">Dreamcast</option>
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
              <p className="text-center mt-4">
                No se encontraron juegos.
              </p>
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
                    <strong>Categoría:</strong> {selectedProduct.categoria}
                  </p>
                  <p>
                    <strong>Plataforma:</strong> {selectedProduct.plataforma}
                  </p>
                  <Form.Group controlId="cantidad">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={10}
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
  )
}

export default Catalogo