import type { FastifyInstance } from 'fastify'
import envPlugin from '@fastify/env'
import { envOptions } from './envOptions'

const load = (server: FastifyInstance) => {
  return server.register(envPlugin, envOptions).ready((err) => {
    if (err) server.log.error(err)
    server.log.info('Environment variables loaded')
  })
}

export default load
