/* eslint-disable @typescript-eslint/no-shadow */
import { Col, Container, Row, Button } from 'react-bootstrap';
import { getFeaturedSession } from '@/lib/featuredSession';
import FeaturedSessionCard from '../components/FeaturedSessionCard';

const LandingPage = async () => {
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
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    width: '48%', // Adjust for left-right alignment
                    height: '60px', // Set a consistent height
                  }}
                  href="/auth/signin"
                >
                  Log Into an Existing Account
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    margin: '10px',
                    width: '48%', // Adjust for left-right alignment
                    height: '60px', // Set a consistent height
                  }}
                  href="/auth/signup"
                >
                  Create a New Account
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

export default LandingPage;
