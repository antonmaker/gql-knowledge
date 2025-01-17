import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify'
import { User } from '@prisma/client'
import type { DecodedToken, RequestAuth } from '~/types/common'

export class AuthHandler {
  server: FastifyInstance

  constructor(server: FastifyInstance) {
    this.server = server
  }

  issueSessionToken(user: User) {
    const payload = {
      id: user?.id,
    }

    return this.server.jwt.sign(
      { payload },
      { expiresIn: 60 * 60 * 24 * 7 }, // 1 week
    )
  }

  isAuthenticated(request: FastifyRequest) {
    return !!request.auth?.user
  }

  getUser(request: FastifyRequest) {
    return request.auth?.user
  }
}

const authPlugin: FastifyPluginAsync = fp(async (server: FastifyInstance) => {
  const authHandler = new AuthHandler(server)

  server.addHook('onRequest', async (request) => {
    if (!request.auth) request.auth = {} as RequestAuth
    try {
      const decodedToken: DecodedToken = await request.jwtVerify()
      const auth = {
        identity: {
          id: decodedToken.payload.id,
          role: decodedToken.payload.role,
        },
        user: null,
      } as RequestAuth

      if (auth.identity) {
        auth.user = await server.prisma.user.findUnique({
          where: {
            id: auth.identity.id,
          },
        })
      }

      request.auth = auth
    } catch (err) {
      server.log.info('No token provided for HTTP request')
    }
  })

  server.decorate('auth', authHandler)
})

export default authPlugin
