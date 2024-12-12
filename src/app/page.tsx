/* eslint-disable @typescript-eslint/no-shadow */
import { PrismaClient } from '@prisma/client';
import { Col, Container, Row, Button } from 'react-bootstrap';
import FeaturedSessionCard from '../components/FeaturedSessionCard';

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

  console.log('Fetched Sessions:', sessions);

  const now = new Date();
  console.log('Current Time:', now);

  const closestSession = sessions.reduce<SessionType | null>((closest, session) => {
    const sessionDate = new Date(session.time);
    const closestDate = closest ? new Date(closest.time) : null;

    return sessionDate > now && (!closestDate || sessionDate < closestDate)
      ? session
      : closest;
  }, null);

  console.log('Closest Session:', closestSession);

  if (closestSession) {
    return {
      ...closestSession,
      time: closestSession.time.toISOString(),
    };
  }

  return null;
};

const Home = async () => {
  const featuredSession = await getFeaturedSession();

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
              <h1 className="mb-4">HELLO THERE!</h1>
              <p>Welcome to Jam Session!</p>
              <div>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px 0',
                    width: '100%',
                  }}
                >
                  Sign-Up!
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px 0',
                    width: '100%',
                  }}
                >
                  Create Profile
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px 0',
                    width: '100%',
                  }}
                >
                  Your Session
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px 0',
                    width: '100%',
                  }}
                >
                  Other Users
                </Button>
              </div>
              <p className="mt-4">TOGETHER, WE CAN MAKE A DIFFERENCE.</p>
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
          padding: '50px 0',
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
