import { objectType, enumType, inputObjectType, idArg, nonNull, extendType, stringArg, list } from 'nexus'

export const ContentRating = enumType({
  name: 'ContentRating',
  members: [
    'G',
    'PG',
    'PG_13',
    'R',
    'NC_17',
    'UNRATED',
  ],
})

export const Movie = objectType({
  name: 'Movie',
  description: '',
  definition(t) {
    t.nonNull.id('id')
    t.string('title')
    t.string('description')
    t.string('releaseDate')
    t.field('contentRating', { type: 'ContentRating' })
    t.int('likes')
    t.float('rating')
    t.string('createdById')
    // t.field('createdBy', { type: 'User' })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const MovieQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('movies', {
      type: list('Movie'),
      resolve: (_r, args, ctx) => {
        return ctx.prisma.movie.findMany()
      },
    })
    t.field('movie', {
      type: 'Movie',
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_r, { id }, ctx) => {
        return ctx.prisma.movie.findUnique({
          where: { id: parseInt(id, 10) }
        })
      },
    })
  },
})
