const schema = {
  type: 'object',
  required: [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'JWT_SECRET',
  ],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    PORT: {
      type: 'string',
      default: 3000,
    },
    DATABASE_URL: { type: 'string' },
    JWT_SECRET: { type: 'string', default: 'secret' },
  },
}

export const isDev = process.env.NODE_ENV === 'development'

export const envOptions = {
  schema,
  dotenv: true,
}
