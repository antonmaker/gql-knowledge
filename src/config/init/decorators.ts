import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

const registerDecorators = (server: FastifyInstance): void => {
  server.decorate('authenticate', async (_request: FastifyRequest, _reply: FastifyReply) => {
    try {
    } catch (err) {
      server.log.error(err)
    }
  })

  server.log.info('Decorators registered')
}

export default registerDecorators
