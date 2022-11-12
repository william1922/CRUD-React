import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

const Home = ({ recetas, imagenCarrusel }) => {
  return (
    <div>
      <Carousel>
        {imagenCarrusel.map((imagen, index) => (
          <Carousel.Item key={index} interval={3000}>
            <img
              className="d-block w-100 imagenes"
              src={`${imagen.imagen}`}
              alt={`${imagen.title}`}
            />
            <Carousel.Caption>
              <h3 className="nombre">{`${imagen.title}`}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <h1 className="text-center">Recetas</h1>
      <div className="d-flex justify-content-end w-100 container">
      <Row className='w-100'>
        {recetas.map((receta, index) => (
          <Col key={index} md={4} className="my-2 d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" className="imagen-card img-fluid" src={`${receta.imagen}`} />
              <Card.Body>
                <Card.Title>{`${receta.title}`}</Card.Title>
                <Card.Text className="card-descripcion border rounded">
                 {`${receta.descripcion}`}
                </Card.Text>
                <Button variant="primary" href={`/receta/${receta.id}`}>Ver Receta</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
};

export default Home;
