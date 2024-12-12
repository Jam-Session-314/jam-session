'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Button, Form } from 'react-bootstrap';
import { changePassword } from '@/lib/dbActions';

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
        <h1 className="text-center mb-4">Change Password</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <input
              type="password"
              {...register('oldpassword')}
              className={`form-control ${errors.oldpassword ? 'is-invalid' : ''}`}
              placeholder="Enter old password"
            />
            <div className="invalid-feedback">{errors.oldpassword?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <input
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter new password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm new password"
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
              Change
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
      </div>
    </main>
  );
};

export default ChangePassword;
