import { Container, Row, Col, Carousel } from 'react-bootstrap'
import Button from '../../components/atoms/Button'
import ProductCard from '../../components/organisms/ProductCard'
import RetroCarousel from '../../components/organisms/RetroCarousel'
import homeCarouselItems from '../../data/homeCarouselItems'
import { useState, useEffect } from 'react';

const API_URL = 'https://backend-retromatic.onrender.com/v1/api/juegos';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 3));
      })
      .catch(err => console.log('Error al cargar productos del home:', err));
  }, []);
  
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
          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} md={4} className="d-flex">
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
