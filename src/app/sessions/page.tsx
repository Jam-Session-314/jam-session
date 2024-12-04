/* eslint-disable @typescript-eslint/no-shadow */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import SessionCard from '@/components/SessionCard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SessionType {
  id: number;
  location: string;
  time: string;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

const SessionsPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch all sessions from the database
  const sessions: SessionType[] = (await prisma.session.findMany({
    select: {
      id: true,
      location: true,
      time: true,
      musicalType: true,
      desiredCapabilities: true,
      organizerContact: true,
      owner: true,
    },
  })).map((session) => ({
    ...session,
    time: session.time.toISOString(), // Convert Date to string
  }));

  return (
    <main>
      <Container id="sessions" fluid className="py-3">
        <Row>
          <Col className="text-center">
            <div className="p-2 rounded header-box mb-3">
              <h1 className="text-white">Current Jam Sessions</h1>
            </div>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {sessions.map((session) => (
            <Col key={`Session-${session.id}`}>
              <SessionCard session={session} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default SessionsPage;
