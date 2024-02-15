import { config } from 'dotenv'
import Fastify, { FastifyBaseLogger, FastifyHttpOptions, FastifyInstance } from 'fastify'
import { Server } from 'http'
import { Input } from './model'
import { resolve } from 'path'
import { computeCartDiscount } from './service'

export const buildFastify = (opts: FastifyHttpOptions<Server, FastifyBaseLogger> = {}): FastifyInstance => {
  const fastify = Fastify(opts)

  // CON: I'm not too familar with Fastify, but I think you could probably define the routes in a different file
  // because this can easily grow to a lot of routes and it would be better to separate them.
  fastify.post('/discount', (request, response) => {
    const output = computeCartDiscount(request.body as Input)
    response.send(output)
  })

  return fastify
}

config({ path: resolve(__dirname, '../.env') })
const port = Number(process.env.PORT)
const app = buildFastify({ logger: true })

// Question: Fastify official docs recommends using async/await for starting the server. Any
// specific reason you are using callback style?

app.listen(
  {
    host: '0.0.0.0',
    port: port || 8080,
    listenTextResolver: (addr) => `Server running and listening on ${addr}`,
  },
  (error, _) => {
    if (error) {
      app.log.error(error)
      process.exit(1)
    }
  }
)
