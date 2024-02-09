import Fastify from 'fastify'
import { Input } from './model'
import { computeCartDiscount } from './service'

const fastify = Fastify({ logger: true })

fastify.post('/discount', (request, response) => {
  const output = computeCartDiscount(request.body as Input)
  response.send(output)
})

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
