import { Col, Container, Row, Button, Image } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
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

    {/* First Featured Session Section */}
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
            <Row className="align-items-center">
              {/* Image Section */}
              <Col xs={12} md={6} className="text-center">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/56b51ac3f699bb15649eb9d7/1455830309202-IQ398AKUMJHAU9VK4KXO/david_byrne_talking_heads_music_headshot_musician_portrait_press_release_professional_michael_benabib_EP_headshot_photographer_flatiron_nyc.jpg"
                  alt="Featured Artist"
                  fluid
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: '2px solid white',
                  }}
                />
              </Col>
              {/* Description Section */}
              <Col xs={12} md={6}>
                <h3>David Byrne</h3>
                <p>
                  Experience an exclusive session with the legendary David Byrne! Known
                  for his groundbreaking work with Talking Heads, this is a rare opportunity
                  to connect with an iconic artist in an intimate setting.
                </p>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    marginTop: '10px',
                    width: '100%',
                  }}
                >
                  Learn More
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Second Featured Session Section */}
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
            <h2 className="text-center mb-4">🎸 Another Featured Session 🎵</h2>
            <Row className="align-items-center">
              {/* Image Section */}
              <Col xs={12} md={6} className="text-center">
                <Image
                  src="https://brm.institute/wp-content/uploads/Beatlesjam-1.jpg"
                  alt="Another Featured Artist"
                  fluid
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: '2px solid white',
                  }}
                />
              </Col>
              {/* Description Section */}
              <Col xs={12} md={6}>
                <h3>The Beatles Jam</h3>
                <p>
                  Immerse yourself in an unforgettable Beatles Jam session! Relive the
                  magic of timeless classics performed with passion and energy. Don't
                  miss this celebration of legendary music!
                </p>
                <Button
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid white',
                    color: 'white',
                    marginTop: '10px',
                    width: '100%',
                  }}
                >
                  Learn More
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
);

export default Home;
