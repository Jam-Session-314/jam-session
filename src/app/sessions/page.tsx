/* eslint-disable @typescript-eslint/no-shadow */
import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';
import AllSessionsPage from '@/components/AllSessionPage';

const prisma = new PrismaClient();

interface SessionType {
  id: number;
  location: string;
  time: string;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

const SessionsPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch all sessions from the database
  const sessions: SessionType[] = (await prisma.session.findMany({
    select: {
      id: true,
      location: true,
      time: true,
      musicalType: true,
      desiredCapabilities: true,
      organizerContact: true,
      owner: true,
    },
  })).map((session) => ({
    ...session,
    time: session.time.toISOString(), // Convert Date to string
  }));

  return (
    <main>
      <AllSessionsPage sessions={sessions} />
    </main>
  );
};

export default SessionsPage;
