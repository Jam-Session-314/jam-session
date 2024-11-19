import { Col, Container, Row, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center text-white"
      style={{ height: '100vh' }}
    >
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
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
  </main>
);

export default Home;
