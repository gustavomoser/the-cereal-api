import Fastify from 'fastify'
import { Input } from 'model'
import { computeCartDiscount } from 'service'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env') })
const port = Number(process.env.PORT)

const fastify = Fastify({ logger: true })

fastify.post('/discount', (request, response) => {
  const output = computeCartDiscount(request.body as Input)
  response.send(output)
})

fastify.listen(
  {
    port: port || 8080,
    listenTextResolver: (addr) => `Server running and listening on ${addr}`,
  },
  (error, _) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
  }
)
