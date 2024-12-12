'use client';

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@prisma/client';
import { EditUserSchema } from '@/lib/validationSchemas';
import { editUser } from '@/lib/dbActions';

const EditAccount = ({ user }: { user: User }) => {
  const defaultValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    instruments: user.instruments || '',
    bio: user.bio || '',
    genre: user.genre || '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const onSubmit = async (data: Omit<typeof defaultValues, 'id'>) => {
    const updatedData = {
      ...data,
      id: user.id, // Explicitly include id
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      instruments: data.instruments || null,
      bio: data.bio || null,
      genre: data.genre || null,
    };
    await editUser(updatedData);
    swal('Success', 'Your profile has been updated', 'success', {
      timer: 2000,
    });
  };

  return (
    <div
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
        <h1 className="text-center mb-4">Edit Your Profile</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <input
              type="text"
              {...register('firstName')}
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <input
              type="text"
              {...register('lastName')}
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Instruments</Form.Label>
            <input
              type="text"
              {...register('instruments')}
              className={`form-control ${errors.instruments ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.instruments?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <textarea
              {...register('bio')}
              className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.bio?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <input
              type="text"
              {...register('genre')}
              className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.genre?.message}</div>
          </Form.Group>
          <Row className="pt-3">
            <Col>
              <Button
                type="submit"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid white',
                  color: 'white',
                  width: '100%',
                  padding: '15px',
                }}
              >
                Submit
              </Button>
            </Col>
            <Col>
              <Button
                type="button"
                onClick={() => reset()}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid white',
                  color: 'white',
                  width: '100%',
                  padding: '15px',
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditAccount;
