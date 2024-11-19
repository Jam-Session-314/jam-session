import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditAccount from '@/components/EditAccount';

export default async function EditAccountPage() {
  // Protect the page, only logged-in users can access it
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  if (!session?.user?.email) {
    return notFound();
  }

  // Fetch the current user's data
  const user: User | null = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return notFound();
  }

  return (
    <main>
      <EditAccount user={user} />
    </main>
  );
}
