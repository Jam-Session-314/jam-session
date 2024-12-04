'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { changePassword } from '@/lib/dbActions';
import './ChangePassword.css'; // Custom CSS for styling

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { data: session } = useSession();
  const email = session?.user?.email || '';
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Old Password is required'),
    password: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    await changePassword({ email, ...data });
    await swal('Success', 'Your password has been changed!', 'success', { timer: 2000 });
    reset();
  };

  return (
    <main className="change-password-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-sm border-0">
              <Card.Body>
                <h2 className="text-center mb-4 text-dark">Change Password</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('oldpassword')}
                      className={errors.oldpassword ? 'is-invalid' : ''}
                      placeholder="Enter old password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.oldpassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('password')}
                      className={errors.password ? 'is-invalid' : ''}
                      placeholder="Enter new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('confirmPassword')}
                      className={errors.confirmPassword ? 'is-invalid' : ''}
                      placeholder="Confirm new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button type="submit" className="btn-black px-4">
                      Change
                    </Button>
                    <Button type="button" onClick={() => reset()} className="btn-gray px-4">
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ChangePassword;
