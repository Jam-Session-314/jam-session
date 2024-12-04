'use client';

import { deleteSession } from '@/lib/dbActions';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */

import { Card, Button } from 'react-bootstrap';
// Helper function to format the time
const formatHawaiianTime = (timeString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Pacific/Honolulu', // Hawaiian Standard Time (HST)
  };
  const date = new Date(timeString);
  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

  // Add the ordinal suffix (e.g., "1st", "2nd", "3rd")
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11
    ? 'st'
    : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';

  return formatted.replace(`${day}`, `${day}${suffix}`);
};

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
  <Card className="h-100 session-card">
    <Card.Body>
      <Card.Title>{session.location}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Time:
        {' '}
        {formatHawaiianTime(session.time)}
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
