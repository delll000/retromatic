import { Container, Row, Col, Carousel } from 'react-bootstrap'
import Button from '../../components/atoms/Button'
import ProductCard from '../../components/organisms/ProductCard'

//este de aca es un placeholder
import products from '../../data/products'

function Home() {
  return (
    <main>
      <section className="py-5 bg-light">
        <Container>
          <Carousel className="home-carousel">

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/portadas/juegos/minecraft.webp"
                alt="portadaMinecraft"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/public/img/portadas/juegos/gowRagnarok.webp"
                alt="portadaGoW"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/public/img/portadas/juegos/mgs2.webp"
                alt="portadaMGS2"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/public/img/portadas/juegos/silksong.webp"
                alt="portadaSilksong"
              />
            </Carousel.Item>
          </Carousel>
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
