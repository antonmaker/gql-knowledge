import { objectType, inputObjectType, stringArg, nonNull, extendType } from 'nexus'

export const HelloQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('hello', {
      type: 'String',
      args: {
        name: stringArg(),
      },
      resolve: (_, { name }) => {
        return `Hello, ${name ? name : 'World'}!`
      },
    })
  },
})
