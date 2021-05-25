import {
  Button,
  Container,
  Nav, Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/route-paths';

export default function AuthLayout({ children, login }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={paths.home}>
          Concord (auth)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to={paths.login}>Login</Nav.Link>
            <Nav.Link as={Link} to={paths.signup}>Signup</Nav.Link> */}
            <Button onClick={login}>
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
