import fp from 'fastify-plugin'
import { PubSub } from 'graphql-subscriptions'
import type { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify'

const pubsubPlugin: FastifyPluginAsync = fp(
  async (server: FastifyInstance, _options: FastifyPluginOptions) => {
    server.decorate('pubsub', new PubSub())
  },
)

export default pubsubPlugin
