'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Profile</h2>
          </Col>
          <Card>
            <Card.Body>
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
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAccount;
