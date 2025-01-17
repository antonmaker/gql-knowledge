import { makeSchema, fieldAuthorizePlugin } from 'nexus'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as types from './types'
// import { isDev } from '~config/init/envOptions'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// const ext = isDev ? 'ts' : 'js'

export const schema = makeSchema({
  types,
  contextType: {
    module: join(__dirname, `../types/context.ts`),
    alias: 'ctx',
    export: 'Context',
  },
  outputs: {
    typegen: join(__dirname, `nexus-typegen.d.ts`),
    schema: join(__dirname, 'schema.graphql'),
  },
  plugins: [fieldAuthorizePlugin()],
})
