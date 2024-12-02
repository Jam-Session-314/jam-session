'use client';

/* eslint-disable @next/next/no-img-element */

import { Card } from 'react-bootstrap';

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

const SessionCard = ({ session }: SessionProps) => (
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
    </Card.Body>
  </Card>
);

export default SessionCard;
