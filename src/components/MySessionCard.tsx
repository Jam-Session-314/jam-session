'use client';

import { deleteSession } from '@/lib/dbActions';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */

import { Card, Button } from 'react-bootstrap';

interface SessionProps {
  session: {
    id: number;
    location: string;
    time: string;
    musicalType: string;
    desiredCapabilities: string;
    organizerContact: string;
    owner: string;
  };
}

const MySessionCard = ({ session }: SessionProps) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title>{session.location}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Time:
        {' '}
        {session.time}
      </Card.Subtitle>
      <Card.Text>
        <strong>Musical Type:</strong>
        {' '}
        {session.musicalType}
        <br />
        <strong>Desired Capabilities:</strong>
        {' '}
        {session.desiredCapabilities}
        <br />
        <strong>Organizer Contact:</strong>
        {' '}
        {session.organizerContact}
      </Card.Text>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="primary">
          <Link className="text-white" href={`edit-session/${session.id}`}>Edit</Link>
        </Button>
        <Button variant="danger" onClick={() => deleteSession(session.id)}>Remove</Button>
      </div>
    </Card.Body>
  </Card>
);

export default MySessionCard;
