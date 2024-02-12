import { Output } from '../model'
import { bananaCake, cocoa, fruity, getAppliedDiscount, inputCart, peanutButter } from './data'
import { buildFastify } from '../server'
import { FastifyInstance } from 'fastify'

let fastifyApp: FastifyInstance
afterAll(() => fastifyApp?.close())

describe('cereal api integration test', () => {
  fastifyApp = buildFastify()

  it('should return the individual discount for each item elegible and the cart total sum', async () => {
    const outputCart: Output = {
      lineItems: [
        { ...peanutButter, price: getAppliedDiscount(peanutButter.price, 0.1) },
        { ...bananaCake, price: getAppliedDiscount(bananaCake.price, 0.1) },
        cocoa,
        { ...fruity, price: getAppliedDiscount(fruity.price, 0.1) },
      ],
      total: '130.38',
    }

    const response = await fastifyApp.inject({ method: 'POST', url: '/discount', body: inputCart })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual(outputCart)
  })
})
