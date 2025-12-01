import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import ProductCard from '../../components/organisms/ProductCard'
import RetroCarousel from '../../components/organisms/RetroCarousel'
import homeCarouselItems from '../../data/homeCarouselItems'

const API_URL = 'https://backend-retromatic.onrender.com/v1/api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

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
          name: juego.titulo,
          description: juego.descripcion,
          price: juego.precio,
          image: juego.urlPortada,
        }))

        setProducts(mapped.slice(0, 3))
      } catch (err) {
        console.error('Error al cargar productos del home:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const goToCatalog = () => {
    navigate('/catalogo')
  }

  return (
    <main>
      <section className="py-5 bg-light">
        <Container>
          <RetroCarousel
            items={homeCarouselItems}
            className="home-carousel"
          />
        </Container>
      </section>

      <section className="py-4 bg-success text-center">
        <Container>
          <Button variant="primary" href="/catalogo">
            Catálogo
          </Button>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h4 className="text-center mb-4">Selección de septiembre</h4>

          {loading && <p className="text-center">Cargando juegos...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          <Row>
            {products.map((product) => (
              <Col
                key={product.id}
                xs={12}
                md={4}
                className="d-flex mb-4"
                style={{ cursor: 'pointer' }}
                onClick={goToCatalog}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default Home
