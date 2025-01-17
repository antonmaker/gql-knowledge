import buildServer from '~/config/server'

async function main() {
  try {
    const server = await buildServer()
    await server.listen({ port: server.config.PORT })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
