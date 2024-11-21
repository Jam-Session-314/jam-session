import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

export default async function ProfilePage() {
  // Get the logged-in user session
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return notFound();
  }

  // Fetch the user data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main
      className="d-flex justify-content-center align-items-center text-white"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h1 className="text-center mb-4">Your Profile</h1>
        <p>
          <strong>First Name:</strong>
          {' '}
          {user.firstName || 'N/A'}
        </p>
        <p>
          <strong>Last Name:</strong>
          {' '}
          {user.lastName || 'N/A'}
        </p>
        <p>
          <strong>Instruments:</strong>
          {' '}
          {user.instruments || 'N/A'}
        </p>
        <p>
          <strong>Bio:</strong>
          {' '}
          {user.bio || 'N/A'}
        </p>
        <p>
          <strong>Genre:</strong>
          {' '}
          {user.genre || 'N/A'}
        </p>
        <div className="d-flex justify-content-center mt-4">
          <a
            href="/edit-account"
            className="btn btn-primary"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid white',
              color: 'white',
            }}
          >
            Edit Profile
          </a>
        </div>
      </div>
    </main>
  );
}
