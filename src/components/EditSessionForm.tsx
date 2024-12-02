'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Session } from '@prisma/client';
import { EditSessionSchema } from '@/lib/validationSchemas';
import { editSession } from '@/lib/dbActions';

const onSubmit = async (data: Session) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editSession(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditSessionForm = ({ session }: { session: Session }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Session>({
    resolver: yupResolver(EditSessionSchema),
  });
  // console.log(stuff);

  const formatDateTime = (date: Date | null) => {
    if (!date) return '';
    const pad = (num: number) => String(num).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Stuff</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={session.id} />
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    defaultValue={session.location}
                    required
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date and Time</Form.Label>
                  <input
                    type="datetime-local"
                    {...register('time')}
                    defaultValue={formatDateTime(session.time ? new Date(session.time) : null)}
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.time?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Musical Type</Form.Label>
                  <input
                    type="text"
                    {...register('musicalType')}
                    defaultValue={session.musicalType}
                    className={`form-control ${errors.musicalType ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.musicalType?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Desired Capabilities</Form.Label>
                  <input
                    type="text"
                    {...register('desiredCapabilities')}
                    defaultValue={session.desiredCapabilities}
                    className={`form-control ${errors.desiredCapabilities ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.desiredCapabilities?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Organizer Contact</Form.Label>
                  <input
                    type="text"
                    {...register('organizerContact')}
                    defaultValue={session.organizerContact}
                    className={`form-control ${errors.organizerContact ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.organizerContact?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={session.owner} />
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

export default EditSessionForm;
