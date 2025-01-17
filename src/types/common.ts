import type { RawServerDefault, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { preHandlerHookHandler } from 'fastify'
import type { JWT } from '@fastify/jwt'
import type { PrismaClient, User } from '@prisma/client'
import { AuthHandler } from '~/plugins/auth'
import { PubSub } from 'graphql-subscriptions'

export interface EnvConfig {
  NODE_ENV: string
  PORT: number
  DATABASE_URL: string
  JWT_SECRET: string
}

export type DecodedToken = {
  payload: {
    id: number
    role: string
  }
  iat: number
}

export type DecodedCheckInToken = {
  businessId: string
  iat: number
  exp: number
}

export type RequestAuthIdentity = {
  id: number | undefined
}

export type RequestAuth = {
  identity: RequestAuthIdentity | undefined
  user: User | null
}

export type QueryObject = {
  [key: string]: string | undefined
}

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig
    authenticate: preHandlerHookHandler<RawServerDefault>
    prisma: PrismaClient
    auth: AuthHandler
    pubsub: PubSub
  }
  interface FastifyRequest {
    jwt: JWT
    auth: RequestAuth | undefined
  }
}
