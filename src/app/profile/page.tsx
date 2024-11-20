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
    <main className="container py-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Profile</h1>
          <p>
            <strong>First Name:</strong>
            {user.firstName || 'N/A'}
          </p>
          <p>
            <strong>Last Name:</strong>
            {user.lastName || 'N/A'}
          </p>
          <p>
            <strong>Instruments:</strong>
            {user.instruments || 'N/A'}
          </p>
          <p>
            <strong>Bio:</strong>
            {user.bio || 'N/A'}
          </p>
          <p>
            <strong>Genre:</strong>
            {user.genre || 'N/A'}
          </p>
          <div className="mt-4">
            <a href="/edit-account" className="btn btn-primary">
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
