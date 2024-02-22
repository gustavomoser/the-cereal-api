import { config } from 'dotenv'
import Fastify, { FastifyBaseLogger, FastifyHttpOptions, FastifyInstance } from 'fastify'
import { Server } from 'http'
import { resolve } from 'path'
import { Input } from './model'
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
const port = Number(process.env.PORT) || 8080
const app = buildFastify()

app.listen(
  {
    port,
    host: '0.0.0.0',
    listenTextResolver: (addr) => `Server running and listening on ${addr}`,
  },
  (error, _) => {
    if (error) {
      app.log.error(error)
      process.exit(1)
    }
  }
)
