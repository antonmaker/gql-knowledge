import type { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import { AltairFastify } from 'altair-fastify-plugin'
import { schema } from '~/graphql'

export const registerGraphql = async (server: FastifyInstance) => {
  server.register(mercurius, {
    schema,
    context: (request, reply) => {
      return {
        request,
        reply,
        server,
        prisma: server.prisma,
        auth: null,
      }
    },
    subscription: {
      context: (_connection, request) => {
        return {
          request,
          server,
          prisma: server.prisma,
          auth: null,
        }
      },
    },
  })

  server.register(AltairFastify, {
    path: '/graphiql',
    baseURL: '/graphiql/',
    endpointURL: '/graphql'
  })
}
