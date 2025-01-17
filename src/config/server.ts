import Fastify, { FastifyInstance } from 'fastify'
import loadEnv from './init/env'
import registerPlugins from './init/plugins'
import registerDecotators from './init/decorators'
import registerRoutes from './init/routes'

export default async function buildServer(): Promise<FastifyInstance> {
  const server = Fastify({
    bodyLimit: 1048576 * 100, // 100MB
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
      },
    },
  })

  loadEnv(server)
  await server.after()

  registerDecotators(server)
  registerPlugins(server)
  registerRoutes(server)

  return server
}
