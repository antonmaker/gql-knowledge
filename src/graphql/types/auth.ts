import { objectType, extendType, inputObjectType, stringArg, nonNull, idArg, list } from 'nexus'

export const SignInResult = objectType({
  name: 'SignInResult',
  definition(t) {
    t.string('sessionToken')
    t.field('user', {
      type: 'User',
    })
  },
})

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('name')
  },
})

export const SignUpResult = objectType({
  name: 'SignUpResult',
  definition(t) {
    t.nonNull.field('user', { type: 'User' })
  },
})

export const AuthQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        if (!ctx.request.auth?.user) return null

        return {
          ...ctx.request.auth?.user,
          id: `${ctx.request.auth?.user?.id}`,
        }
      },
    })
  },
})

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signIn', {
      type: 'SignInResult',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_r, { email, password }, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { email: email },
        })
        const errorMessage = 'Invalid credentials'
        if (!user) {
          throw new Error(errorMessage)
        }

        let match = false
        match = await ctx.server.bcrypt.compare(password, user.password)

        if (!match) {
          throw new Error(errorMessage)
        }

        return {
          sessionToken: ctx.server.auth.issueSessionToken(user),
          user: {
            ...user,
            id: `${user.id}`,
          },
        }
      },
    })
    t.nonNull.field('signUp', {
      type: 'SignUpResult',
      args: {
        data: nonNull(SignUpInput),
      },
      async resolve( _root, { data }, ctx) {
        const existingUser = await ctx.prisma.user.findUnique({
          where: { email: data.email },
        })
        if (existingUser) {
          throw new Error('Email is taken')
        }

        const hashedPassword = await ctx.server.bcrypt.hash(data.password)
        const user = await ctx.prisma.user.create({
          data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
          },
        })

        return {
          user,
        }
      }
    })
  },
})
