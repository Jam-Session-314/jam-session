/* eslint-disable @typescript-eslint/no-shadow */
import { Col, Container, Row, Button } from 'react-bootstrap';
import { getFeaturedSession } from '@/lib/featuredSession';
import { getUserFullName } from '@/lib/getUserFullName';
import FeaturedSessionCard from '../../components/FeaturedSessionCard';

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
