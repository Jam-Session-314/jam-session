import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SessionType {
  id: number;
  location: string;
  time: Date;
  musicalType: string;
  desiredCapabilities: string;
  organizerContact: string;
  owner: string;
}

// eslint-disable-next-line import/prefer-default-export
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

  const now = new Date();

  const closestSession = sessions.reduce<SessionType | null>((closest, session) => {
    const sessionDate = new Date(session.time);
    const closestDate = closest ? new Date(closest.time) : null;

    return sessionDate > now && (!closestDate || sessionDate < closestDate)
      ? session
      : closest;
  }, null);

  if (closestSession) {
    return {
      ...closestSession,
      time: closestSession.time.toISOString(),
    };
  }

  return null;
};
