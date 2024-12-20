'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addSession } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddSessionSchema } from '@/lib/validationSchemas';

const onSubmit = async (data:
{ location: string;
  time: Date;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addSession(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddSessionForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSessionSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card className="form-card session-edit-card shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <input
              type="text"
              {...register('location')}
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.location?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date and Time</Form.Label>
            <input
              type="datetime-local"
              {...register('time')}
              className={`form-control ${errors.time ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.time?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Musical Type</Form.Label>
            <input
              type="text"
              {...register('musicalType')}
              className={`form-control ${errors.musicalType ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.musicalType?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Desired Capabilities</Form.Label>
            <input
              type="text"
              {...register('desiredCapabilities')}
              className={`form-control ${errors.desiredCapabilities ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.desiredCapabilities?.message}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Organizer Contact</Form.Label>
            <input
              type="text"
              {...register('organizerContact')}
              className={`form-control ${errors.organizerContact ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.organizerContact?.message}</div>
          </Form.Group>

          <input type="hidden" {...register('owner')} value={currentUser} />
          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="success" className="w-100 submit-btn">
                Submit
              </Button>
            </Col>
            <Col>
              <Button
                type="button"
                onClick={() => reset()}
                variant="outline-warning"
                className="w-100 reset-btn"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddSessionForm;
