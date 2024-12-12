'use client';

import { signIn } from 'next-auth/react';
import { Button, Container, Form } from 'react-bootstrap';
import './signin.css'; // Link to your CSS file

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/home',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <main className="signin-page">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-box">
          <h2>LOG IN TO YOUR ACCOUNT</h2>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="text"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                className="form-control"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button type="submit" className="btn btn-primary">
                LOG-IN
              </Button>
              <Button href="/auth/signup" variant="secondary">
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </main>
  );
};

export default SignIn;
