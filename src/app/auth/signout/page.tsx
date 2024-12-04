'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import './signout.css';

const SignOut = () => (
  <div className="signout-container">
    <Container className="text-center py-5">
      <h2 className="signout-header">Do you want to sign out?</h2>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button
            variant="danger"
            size="lg"
            className="signout-button"
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          >
            Sign Out
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" size="lg" className="cancel-button" href="/">
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SignOut;
