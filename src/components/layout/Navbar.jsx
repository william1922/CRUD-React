import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavbarRecetas = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/"  className="text-decoration-none navbar-brand">Recetas.Org</Link>
          <Nav className="me-auto">
            <Link className="text-decoration-none nav-link" to="/">Home</Link>
            <Link to="/receta-tabla" className="text-decoration-none nav-link">Productos tabla</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarRecetas;
