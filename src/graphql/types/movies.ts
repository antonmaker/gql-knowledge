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
    t.field('contentRating', { type: 'ContentRating' })
    t.string('genre')
    t.int('likes')
    t.float('rating')
    t.string('createdById')
    t.field('createdBy', {
      type: 'User',
      resolve(movie, _args, ctx) {
        if (!movie?.createdById) return null

        return ctx.prisma.user.findUnique({
          where: { id: parseInt(movie.createdById, 10) }
        })
      }
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const MovieInput = inputObjectType({
  name: 'MovieInput',
  description: '',
  definition(t) {
    t.nonNull.string('title')
    t.string('description')
    t.string('genre')
    t.nonNull.field('contentRating', { type: 'ContentRating' })
    t.int('likes')
    t.float('rating')
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

export const MovieMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createMovie', {
      type: 'Movie',
      args: {
        data: nonNull('MovieInput'),
      },
      resolve: (_r, { data }, ctx) => {
        const userId = ctx.request.auth?.user?.id

        if (!userId) {
          throw new Error('Not authorized. You need to sign in.')
        }
        return ctx.prisma.movie.create({
          data: {
            ...data,
            releaseDate: new Date(),
            createdById: userId,
          },
        })
      },
    })
    t.field('updateMovie', {
      type: 'Movie',
      args: {
        id: idArg(),
        data: nonNull('MovieInput'),
      },
      async resolve (_r, { id, data }, ctx) {
        const userId = ctx.request.auth?.user?.id

        if (!userId) {
          throw new Error('Not authorized. You need to sign in.')
        }

        const movie = await ctx.prisma.movie.findUnique({
          where: { id: parseInt(id, 10) },
        })

        if (!movie) {
          throw new Error(`Movie with id:${id} was not found`)
        }

        if (movie.createdById !== userId) {
          throw new Error('You are not the author of the movie item')
        }

        return ctx.prisma.movie.update({
          where: { id: parseInt(id, 10) },
          data: {
            ...data,
          },
        })
      },
    })
    t.field('deleteMovie', {
      type: 'Movie',
      args: {
        id: idArg(),
      },
      async resolve (_r, { id }, ctx) {
        const userId = ctx.request.auth?.user?.id

        if (!userId) {
          throw new Error('Not authorized. You need to sign in.')
        }

        const movie = await ctx.prisma.movie.findUnique({
          where: { id: parseInt(id, 10) },
        })

        if (!movie) {
          throw new Error(`Movie with id:${id} was not found`)
        }

        if (movie.createdById !== userId) {
          throw new Error('You are not the author of the movie item')
        }

        return ctx.prisma.movie.delete({
          where: { id: parseInt(id, 10) },
        })
      },
    })
  },
})
