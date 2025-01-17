import fp from 'fastify-plugin'
import type { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  ...(process.env.NODE_ENV !== 'production' && { log: ['query', 'info', 'warn', 'error'] }),
})

const prismaPlugin: FastifyPluginAsync = fp(
  async (server: FastifyInstance, _options: FastifyPluginOptions) => {
    await prisma.$connect()

    // Make Prisma Client available through the fastify server instance: server.prisma
    server.decorate('prisma', prisma)

    server.addHook('onClose', async () => {
      await server.prisma.$disconnect()
    })
  },
)

export default prismaPlugin
