import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Button, Form,
} from 'react-bootstrap';
import paths from '../router/route-paths';
import React from 'react';

export default function Login() {
  return (
    <Row>
      <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Link to={paths.signup} className="float-right">
              <Button typy="button" variant="outline-primary">
                Sign up
              </Button>
            </Link>
            <Card.Title>Sign in</Card.Title>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
