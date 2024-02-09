import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

fastify.post('/discount', (request, response) => response.send('Hello world'))

fastify.listen(
  {
    port: 8080,
    listenTextResolver: (addr) => `Server running and listening on ${addr}`,
  },
  (error, _) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
  }
)
