/* eslint-disable @typescript-eslint/no-shadow */
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
import authOptions from '@/lib/authOptions';
import FeaturedSessionCard from '../../components/FeaturedSessionCard';

const prisma = new PrismaClient();

interface SessionType {
  id: number;
  location: string;
  time: Date; // Use Date because Prisma returns `Date` objects for date/time fields
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

export const getFeaturedSession = async (): Promise<Omit<SessionType, 'time'> & { time: string } | null> => {
  const sessions = await prisma.session.findMany({
    select: {
      id: true,
      location: true,
      time: true,
      musicalType: true,
      desiredCapabilities: true,
      organizerContact: true,
      owner: true,
    },
  });

  const now = new Date();

  const closestSession = sessions.reduce<SessionType | null>((closest, session) => {
    const sessionDate = new Date(session.time);
    const closestDate = closest ? new Date(closest.time) : null;

    return sessionDate > now && (!closestDate || sessionDate < closestDate)
      ? session
      : closest;
  }, null);

  if (closestSession) {
    return {
      ...closestSession,
      time: closestSession.time.toISOString(),
    };
  }

  return null;
};

export const getUserFullName = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { firstName: 'Guest', lastName: '' };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { firstName: true, lastName: true },
  });

  if (!user) {
    return { firstName: 'Guest', lastName: '' };
  }

  return { firstName: user.firstName || 'Guest', lastName: user.lastName || '' };
};

const Home = async () => {
  const featuredSession = await getFeaturedSession();
  const userName = await getUserFullName();

  return (
    <main>
      {/* Hello Section */}
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
          padding: '50px 0',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={5}
              className="text-center p-4"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
              }}
            >
              <h1 className="mb-4">
                Aloha
                {' '}
                {userName.firstName}
                {' '}
                {userName.lastName}
                !
              </h1>
              <p>Welcome to Jam Session!</p>
              <div className="d-flex flex-wrap justify-content-between">
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    flex: '1 1 45%',
                    padding: '15px',
                  }}
                  href="/sessions"
                >
                  View Sessions
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    flex: '1 1 45%',
                    padding: '15px',
                  }}
                  href="/my-sessions"
                >
                  My Sessions
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    flex: '1 1 45%',
                    padding: '15px',
                  }}
                  href="/add-session"
                >
                  Add Session
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    flex: '1 1 45%',
                    padding: '15px',
                  }}
                  href="/profile"
                >
                  My Profile
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Session Section */}
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
          padding: '0 0 20px',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={10}
              className="p-4"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '10px',
              }}
            >
              <h2 className="text-center mb-4">🎤 Featured Session 🎶</h2>
              {featuredSession ? (
                <FeaturedSessionCard session={featuredSession} />
              ) : (
                <p className="text-center text-white">
                  No upcoming sessions available.
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Home;
