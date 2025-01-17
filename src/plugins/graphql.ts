import type { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import SchemaBuilder from '@pothos/core'
import { AltairFastify } from 'altair-fastify-plugin'

const builder = new SchemaBuilder({})

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
})

const schema = builder.toSchema()

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
