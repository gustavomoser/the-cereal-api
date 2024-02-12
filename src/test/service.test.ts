import { CartItem, discountRelation } from '../model'
import { bananaCake, cocoa, fruity, getAppliedDiscount, inputCart, peanutButter } from './data'
import { computeCartDiscount, getDiscount } from '../service'

describe('cereal api unit tests', () => {
  describe('computeChartDiscount function unit test', () => {
    it('should return the output correctly', () => {
      const output = computeCartDiscount(inputCart)

      const updatedPeanut = output.lineItems.find((item: CartItem) => item.name === peanutButter.name) as CartItem
      const updatedBanana = output.lineItems.find((item: CartItem) => item.name === bananaCake.name) as CartItem
      const updatedFruity = output.lineItems.find((item: CartItem) => item.name === fruity.name) as CartItem
      const updatedCocoa = output.lineItems.find((item: CartItem) => item.name === cocoa.name) as CartItem

      expect(updatedPeanut.price).toEqual(getAppliedDiscount(peanutButter.price, discountRelation[3]))
      expect(updatedBanana.price).toEqual(getAppliedDiscount(bananaCake.price, discountRelation[3]))
      expect(updatedFruity.price).toEqual(getAppliedDiscount(fruity.price, discountRelation[3]))
      expect(updatedCocoa.price).toEqual(cocoa.price)

      expect(output.total).toEqual('130.38')
    })
  })
  describe('getDiscount function unit test', () => {
    it('should return correctly the discount for the amount of cereal boxes', () => {
      const discount = getDiscount([peanutButter, bananaCake, cocoa, fruity])

      expect(discount).toEqual(0.9)
    })
  })
})
