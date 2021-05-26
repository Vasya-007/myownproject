import {
  Button,
  Container,
  Nav, Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/route-paths';
import AuthManager from '../../services/AuthManager';
import React from 'react';

export default function AppLayout({ children }) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={paths.home}>
          Concord (app)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button onClick={() => AuthManager.logout()}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}
