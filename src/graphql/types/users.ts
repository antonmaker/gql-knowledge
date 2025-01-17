import { objectType, enumType, inputObjectType, idArg, nonNull, extendType, stringArg, list } from 'nexus'

export const User = objectType({
  name: 'User',
  description: '',
  definition(t) {
    t.nonNull.id('id')
    t.string('email')
    t.string('name')
    t.field('movies', {
      type: list('Movie'),
      resolve(user, _args, ctx) {
        if (!user) return []

        return ctx.prisma.movie.findMany({
          where: {
            createdById: parseInt(user.id, 10),
          },
        })
      }
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('users', {
      type: list('User'),
      resolve: (_r, args, ctx) => {
        return ctx.prisma.user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_r, { id }, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { id: parseInt(id, 10) }
        })
      },
    })
  },
})
