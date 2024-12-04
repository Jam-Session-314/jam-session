/* eslint-disable @typescript-eslint/no-shadow */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';
import MySessionCard from '@/components/MySessionCard';

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
  const currentUser = session?.user?.email || '';
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
  })).filter((session) => session.owner === currentUser)
    .map((session) => ({
      ...session,
      time: session.time.toISOString(), // Convert Date to string
    }));

  return (
    <main>
      <Container id="sessions" fluid className="py-3">
        <Row>
          <Col className="text-center">
            <div className="p-2 rounded header-box mb-3">
              <h1 className="text-white">Your Jam Sessions</h1>
            </div>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {sessions.map((session) => (
            <Col key={`Session-${session.id}`}>
              <MySessionCard session={session} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default SessionsPage;
