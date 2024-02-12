import { config } from 'dotenv'
import Fastify, { FastifyBaseLogger, FastifyHttpOptions, FastifyInstance } from 'fastify'
import { Server } from 'http'
import { Input } from './model'
import { resolve } from 'path'
import { computeCartDiscount } from './service'

export const buildFastify = (opts: FastifyHttpOptions<Server, FastifyBaseLogger> = {}): FastifyInstance => {
  const fastify = Fastify(opts)

  fastify.post('/discount', (request, response) => {
    const output = computeCartDiscount(request.body as Input)
    response.send(output)
  })

  return fastify
}

config({ path: resolve(__dirname, '../.env') })
const port = Number(process.env.PORT)
const app = buildFastify({ logger: true })

app.listen(
  {
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
