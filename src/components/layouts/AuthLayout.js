import {
  Container,
  Nav, Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/route-paths';

import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={paths.home}>
          Concord (auth)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={paths.login}>Login</Nav.Link>
            {/* <Nav.Link as={Link} to={paths.signup}>Signup</Nav.Link>  */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}
