import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';
import MySessionCard from '@/components/MySessionCard';

interface SessionType {
  id: number;
  location: string;
  time: string;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

const prisma = new PrismaClient();

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch all sessions from the database
  const results: SessionType[] = (await prisma.session.findMany({
    select: {
      id: true,
      location: true,
      time: true,
      musicalType: true,
      desiredCapabilities: true,
      organizerContact: true,
      owner: true,
    },
  })).map((result) => ({
    ...result,
    time: result.time.toISOString(), // Convert Date to string
  }));

  return (
    <main>
      <Container id="sessions" fluid className="py-3">
        <Row>
          <Col className="text-center">
            <div className="p-2 rounded header-box mb-3">
              <h1 className="text-white">Manage All Sessions</h1>
            </div>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {results.map((result) => (
            <Col key={`Session-${result.id}`}>
              <MySessionCard session={result} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
