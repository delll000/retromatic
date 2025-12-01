import { Container, Card } from 'react-bootstrap'
import Image from '../../components/atoms/Image'
import RetroCarousel from '../../components/organisms/RetroCarousel'
import usCarouselItems from '../../data/usCarouselItems'


function Us() {
  return (
    <Container className="mx-auto justify-content-center" id="Fondo">
      <div className="p-5 mt-5">
        <div className="text-center justify-content-center">
          <Image
            src="public\Logo3.webp"
            id="imagenes"
          />

          <Card className="mt-3 p-2" id="Fondo_Us">
            <Card
              style={{ width: '50%' }}
              id="F"
              className="text-center justify-content-center mx-auto mt-1 p-1"
            >
              <h1 id="Texto">¿Quiénes somos?</h1>
            </Card>

            <Card.Body>
              <Card id="F">
                <Card.Text id="Texto" className="m-3 p-3">
                  <h2>
                    "Retromatic es más que una tienda: es un espacio creado por
                    y para gamers, donde la pasión por los videojuegos clásicos
                    y actuales se encuentra en un solo lugar."
                  </h2>
                </Card.Text>
              </Card>

              <RetroCarousel items={usCarouselItems} className="mt-4" />

              <Card
                style={{ width: '50%' }}
                id="F"
                className="text-center justify-content-center mx-auto mt-3 p-1"
              >
                <h2 id="Texto">Nuestro Equipo</h2>
              </Card>
            </Card.Body>

            <Card id="C">
              <Card.Text id="Texto" className="m-3 p-2">
                <h3>
                  "En Retromatic somos un equipo de gamers y entusiastas de la
                  tecnología que combina experiencia y pasión por los
                  videojuegos. Nos mueve la nostalgia retro y la emoción de lo
                  nuevo, siempre buscando ofrecerte una selección de juegos y
                  servicios de calidad."
                </h3>
              </Card.Text>
            </Card>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default Us
