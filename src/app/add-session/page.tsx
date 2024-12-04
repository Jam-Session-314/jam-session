import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddSessionForm from '@/components/AddSessionForm';
import { Col, Container, Row } from 'react-bootstrap';

const AddSession = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <Container className="py-3">
        <Row>
          <Col className="text-center">
            <div className="p-2 rounded header-box mb-4">
              <h2 className="text-white">Add Jam Session</h2>
            </div>
          </Col>
        </Row>
        <AddSessionForm />
      </Container>
    </main>

  );
};

export default AddSession;
