import type { PrismaClient } from '@prisma/client'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export type Context = {
  prisma: PrismaClient
  server: FastifyInstance
  request: FastifyRequest
  reply: FastifyReply
}
