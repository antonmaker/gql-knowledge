import type { FastifyInstance } from 'fastify'
import corsPlugin from '@fastify/cors'
import formbodyPlugin from '@fastify/formbody'
import sensiblePlugin from '@fastify/sensible'
import jwtPlugin from '@fastify/jwt'
import bcryptPlugin from 'fastify-bcrypt'
import rawBodyPlugin from 'fastify-raw-body'
import prismaPlugin from '~/plugins/prisma'
import authPlugin from '~/plugins/auth'
import pubsubPlugin from '~/plugins/pubsub'
// import { registerGraphql } from '~/plugins/graphql'

const registerPlugins = (server: FastifyInstance) => {
  server
    .register(jwtPlugin, {
      secret: server.config.JWT_SECRET,
    })
    .ready((err) => {
      if (err) server.log.error(err)
      server.log.info('JWT plugin is ready')
    })
  server.register(bcryptPlugin, {
    saltWorkFactor: 12,
  })
  server.register(corsPlugin, {
    origin: '*',
  })
  server.register(sensiblePlugin)
  server.register(prismaPlugin)
  server.register(authPlugin)
  server.register(rawBodyPlugin)
  server.register(formbodyPlugin)
  server.register(pubsubPlugin)
  // registerGraphql(server)
}

export default registerPlugins
