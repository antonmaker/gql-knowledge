import { PrismaClient, type Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const bcryptSalt = bcrypt.genSaltSync(12)
const password = bcrypt.hashSync('12341234', bcryptSalt)

async function seed() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@movie.demo',
      name: 'Admin',
      password,
    },
  })

  await prisma.movie.create({
    data: {
      title: 'Inception',
      description: 'A mind-bending thriller about dream heists.',
      releaseDate: new Date('2010-07-16'),
      genre: 'Science Fiction',
      contentRating: 'PG_13',
      rating: 8.8,
      createdById: user.id,
    },
  });

  await prisma.movie.create({
    data: {
      title: 'The Dark Knight',
      description: 'A gritty superhero film with a legendary villain.',
      releaseDate: new Date('2008-07-18'),
      genre: 'Action',
      contentRating: 'PG_13',
      rating: 9.0,
      createdById: user.id,
    },
  });

  await prisma.movie.create({
    data: {
      title: 'The Grand Budapest Hotel',
      description: 'A whimsical tale of adventure and camaraderie.',
      releaseDate: new Date('2014-03-28'),
      genre: 'Comedy',
      contentRating: 'R',
      rating: 8.1,
      createdById: user.id,
    },
  });

  await prisma.movie.create({
    data: {
      title: 'Spirited Away',
      description: 'A magical journey in a mysterious spirit world.',
      releaseDate: new Date('2001-07-20'),
      genre: 'Animation',
      contentRating: 'PG',
      rating: 8.6,
      createdById: user.id,
    },
  });

  await prisma.movie.create({
    data: {
      title: 'Parasite',
      description: 'A dark satire on class and social inequality.',
      releaseDate: new Date('2019-05-30'),
      genre: 'Drama',
      contentRating: 'R',
      rating: 8.6,
      createdById: user.id,
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
