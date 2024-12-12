/* eslint-disable import/prefer-default-export */
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

interface UserFullName {
  firstName: string;
  lastName: string;
}

export const getUserFullName = async (): Promise<UserFullName> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { firstName: 'Guest', lastName: '' };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { firstName: true, lastName: true },
  });

  if (!user) {
    return { firstName: 'Guest', lastName: '' };
  }

  return {
    firstName: user.firstName || 'Guest',
    lastName: user.lastName || '',
  };
};
