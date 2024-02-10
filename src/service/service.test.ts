import { CartItem, Input } from 'model'
import { computeCartDiscount, getDiscount } from 'service'

describe('service test suite', () => {
  describe('computeChartDiscountTest', () => {
    it('should return the output correctly', () => {
      const peanutButter: CartItem = {
        name: 'Peanut Butter',
        price: '39',
        collection: 'BEST-SELLERS',
      }
      const bananaCake: CartItem = { name: 'Banana Cake', price: '34.99', collection: 'DEFAULT' }
      const cocoa: CartItem = { name: 'Cocoa', price: '34.99', collection: 'KETO' }
      const fruity: CartItem = { name: 'Fruity', price: '32', collection: 'DEFAULT' }

      const input: Input = {
        cart: {
          reference: '2d832fe0-6c96-4515-9be7-4c00983539c1',
          lineItems: [peanutButter, bananaCake, cocoa, fruity],
        },
      }

      const output = computeCartDiscount(input)

      const updatedPeanut = output.lineItems.find((item: CartItem) => item.name === peanutButter.name) as CartItem
      const updatedBanana = output.lineItems.find((item: CartItem) => item.name === bananaCake.name) as CartItem
      const updatedFruity = output.lineItems.find((item: CartItem) => item.name === fruity.name) as CartItem
      const updatedCocoa = output.lineItems.find((item: CartItem) => item.name === cocoa.name) as CartItem

      expect(updatedPeanut.price).toEqual((parseFloat(peanutButter.price) * 0.9).toFixed(2))
      expect(updatedBanana.price).toEqual((parseFloat(bananaCake.price) * 0.9).toFixed(2))
      expect(updatedFruity.price).toEqual((parseFloat(fruity.price) * 0.9).toFixed(2))
      expect(updatedCocoa.price).toEqual(cocoa.price)

      expect(output.total).toEqual('130.38')
    })
  })
  describe('getDiscountTest', () => {
    it('should return correctly the discount for the amount of cereal boxes', () => {
      const peanutButter: CartItem = {
        name: 'Peanut Butter',
        price: '34.99',
        collection: 'BEST-SELLERS',
      }
      const bananaCake: CartItem = { name: 'Banana Cake', price: '34.99', collection: 'DEFAULT' }
      const cocoa: CartItem = { name: 'Cocoa', price: '34.99', collection: 'KETO' }
      const fruity: CartItem = { name: 'Fruity', price: '32', collection: 'DEFAULT' }

      const discount = getDiscount([peanutButter, bananaCake, cocoa, fruity])

      expect(discount).toEqual(0.9)
    })
  })
})
