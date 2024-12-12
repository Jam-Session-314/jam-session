/* eslint-disable no-nested-ternary */

'use client';

/* eslint-disable @next/next/no-img-element */

import { Card } from 'react-bootstrap';

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

const SessionCard = ({ session }: SessionProps) => (
  <Card
    className="featured-session-card"
    style={{
      maxWidth: '600px', // Limit the card width
      margin: '0 auto', // Center the card horizontally
      backgroundColor: '#dff0d8', // Light green background
      borderRadius: '10px',
      padding: '15px', // Reduce padding to decrease height
      textAlign: 'center', // Center-align all text
      color: '#333', // Darker text for contrast
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
      lineHeight: '1.4', // Reduce line height for compactness
    }}
  >
    <Card.Body
      style={{
        padding: '10px', // Tighten internal padding
      }}
    >
      <Card.Title
        style={{
          fontSize: '1.2rem', // Slightly smaller title
          fontWeight: 'bold',
          marginBottom: '5px', // Reduce bottom margin
        }}
      >
        {session.location}
      </Card.Title>
      <Card.Subtitle
        className="mb-2 text-muted"
        style={{
          fontSize: '0.9rem', // Smaller subtitle
          marginBottom: '5px', // Reduce spacing
        }}
      >
        Time:
        {' '}
        {formatHawaiianTime(session.time)}
      </Card.Subtitle>
      <Card.Text style={{ fontSize: '0.9rem', margin: 0 }}>
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
