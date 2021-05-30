import {
  Button,
  Container,
  Nav, Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import paths from '../../router/route-paths';
import AuthManager from '../../services/AuthManager';

export default function AppLayout({ children }) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={paths.home}>
            Concord
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button onClick={() => AuthManager.logout()}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}
