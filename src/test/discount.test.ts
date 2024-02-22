import { CartItem, discountRelation } from '../model'
import { computeCartDiscount, getDiscount } from '../service'
import { bananaCake, cocoa, fruity, getAppliedDiscount, inputCart, peanutButter } from './data'

describe('cereal api unit tests', () => {
  describe('computeChartDiscount function unit test', () => {
    it('should return the output without discount when the cart does not have enough products', () => {
      const fruity: CartItem = { collection: 'SINGLE_PRODUCT', name: 'Fruity Loops', price: '35.00' }
      const output = computeCartDiscount({ cart: { reference: '1', lineItems: [fruity] } })

      expect(output.lineItems.length).toEqual(1)
      expect(output.lineItems[0]).toEqual(fruity)
      expect(output.total).toEqual(fruity.price)
    })

    it('should return the output correctly even though an item has a negative price', () => {
      const vanilla: CartItem = { collection: 'COLLECTION_1', name: 'Vanilla', price: '35.00' }
      const chocolate: CartItem = { collection: 'COLLECTION_2', name: 'Chocolate', price: '-35.00' }
      const output = computeCartDiscount({ cart: { reference: '1', lineItems: [vanilla, chocolate] } })

      const updatedVanilla = output.lineItems.find((item: CartItem) => item.name === vanilla.name) as CartItem
      const updatedChocolate = output.lineItems.find((item: CartItem) => item.name === vanilla.name) as CartItem

      expect(output.lineItems.length).toEqual(2)
      expect(updatedVanilla.price).toEqual(getAppliedDiscount(vanilla.price, discountRelation[2]))
      expect(updatedChocolate.price).toEqual(getAppliedDiscount(chocolate.price, discountRelation[2]))
      expect(output.total).toEqual('66.50')
    })

    it('should return the output with 3 product discount applied', () => {
      const output = computeCartDiscount(inputCart)

      const updatedPeanut = output.lineItems.find((item: CartItem) => item.name === peanutButter.name) as CartItem
      const updatedBanana = output.lineItems.find((item: CartItem) => item.name === bananaCake.name) as CartItem
      const updatedFruity = output.lineItems.find((item: CartItem) => item.name === fruity.name) as CartItem
      const updatedCocoa = output.lineItems.find((item: CartItem) => item.name === cocoa.name) as CartItem

      expect(output.lineItems.length).toEqual(4)
      expect(updatedPeanut.price).toEqual(getAppliedDiscount(peanutButter.price, discountRelation[3]))
      expect(updatedBanana.price).toEqual(getAppliedDiscount(bananaCake.price, discountRelation[3]))
      expect(updatedFruity.price).toEqual(getAppliedDiscount(fruity.price, discountRelation[3]))
      expect(updatedCocoa.price).toEqual(cocoa.price)

      expect(output.total).toEqual('130.38')
    })

    it('should not apply discount on items of KETO collection', () => {
      const keto1: CartItem = { collection: 'KETO', name: 'Fruity Loops', price: '35.00' }
      const keto2: CartItem = { collection: 'KETO', name: 'Choco Loops', price: '35.00' }
      const keto3: CartItem = { collection: 'KETO', name: 'Vanilla Loops', price: '35.00' }

      const output = computeCartDiscount({ cart: { reference: '1', lineItems: [keto1, keto2, keto3] } })

      const updatedKeto1 = output.lineItems.find((item: CartItem) => item.name === keto1.name) as CartItem
      const updatedKeto2 = output.lineItems.find((item: CartItem) => item.name === keto2.name) as CartItem
      const updatedKeto3 = output.lineItems.find((item: CartItem) => item.name === keto3.name) as CartItem

      expect(output.lineItems.length).toEqual(3)
      expect(updatedKeto1.price).toEqual(keto1.price)
      expect(updatedKeto2.price).toEqual(keto2.price)
      expect(updatedKeto3.price).toEqual(keto3.price)

      expect(parseFloat(output.total)).toEqual(
        parseFloat(keto1.price) + parseFloat(keto2.price) + parseFloat(keto3.price)
      )
    })
  })

  describe('getDiscount function unit test', () => {
    it('should return the discount for the amount of cereal boxes', () => {
      const discount = getDiscount([peanutButter, bananaCake, cocoa, fruity])

      expect(discount).toEqual(0.9)
    })
  })
})
