'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    await createUser(data);
    await signIn('credentials', { callbackUrl: '/home', ...data });
  };

  return (
    <main
      className="d-flex justify-content-center align-items-center text-white"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h1 className="text-center mb-4">Sign Up</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <input
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm your password"
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button
              type="submit"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid white',
                color: 'white',
                width: '48%',
              }}
            >
              Register
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid white',
                color: 'white',
                width: '48%',
              }}
            >
              Reset
            </Button>
          </div>
        </Form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?
            {' '}
            <a
              href="/auth/signin"
              style={{ color: '#fff', textDecoration: 'underline' }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
