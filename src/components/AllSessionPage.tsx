'use client';

import { useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import SessionCard from './SessionCard';

interface SessionType {
  id: number;
  location: string;
  time: string;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

const AllSessionsPage = ({ sessions }: { sessions: SessionType[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = sessions.filter((session) => session.location.toLowerCase().includes(searchValue)
      || session.musicalType.toLowerCase().includes(searchValue)
      || session.desiredCapabilities.toLowerCase().includes(searchValue));
    setFilteredSessions(filtered);
  };

  return (
    <Container id="sessions" fluid className="py-3">
      <Row>
        <Col className="text-center">
          <div className="p-2 rounded header-box mb-3">
            <h1 className="text-white">Current Jam Sessions</h1>
          </div>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search by location, musical type, or capabilities"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '100%' }} // Ensures the search bar takes up the full width of its column
          />
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredSessions.map((session) => (
          <Col key={`Session-${session.id}`}>
            <SessionCard session={session} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllSessionsPage;
