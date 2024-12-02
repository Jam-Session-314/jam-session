import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seed default accounts
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
        firstName: account.firstName || 'DefaultFirstName',
        lastName: account.lastName || 'DefaultLastName',
        instruments: account.instruments || 'None',
        bio: account.bio || 'Default bio here...',
        genre: account.genre || 'None',
      },
    });
  });

  // Seed default stuff
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });

  // Seed default sessions
  config.defaultSessions.forEach(async (session, index) => {
    console.log(`  Adding session at location: ${session.location}`);
    await prisma.session.upsert({
      where: { id: index + 1 }, // Adjust to ensure proper uniqueness
      update: {},
      create: {
        location: session.location,
        time: new Date(session.time),
        musicalType: session.musicalType,
        desiredCapabilities: session.desiredCapabilities,
        organizerContact: session.organizerContact,
        owner: session.owner,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
