// CON: I think this file name is not very self-explanatory. You could probably brake it into "discount" or "cart" related functions instead. For example:
//
// src/services/discount.ts
// src/services/cart.ts

import {
  CartItem,
  Input,
  UPPER_ELEGIBLE_AMOUNT,
  LOWER_ELEGIBLE_AMOUNT,
  Output,
  discountRelation,
  nonQualifiedCollections,
} from '../model'

export const computeCartDiscount = (input: Input): Output => {
  const items = input.cart.lineItems

  const discount = getDiscount(items)

  let total = 0

  // PRO: Calculating the final price by iterating only once through the items.
  const computedCart: CartItem[] = items.map((item) => {
    // CON: Use a better parsing technique for the item price. A price could potentially be
    // a negative value for example, and the way you're calculating the final price would
    // subtract this value from the total which is a big problem. Taking the following example
    // input would result in the wrong total:
    //
    // {
    //   "cart": {
    //     "reference": "2d832fe0-6c96-4515-9be7-4c00983539c1",
    //       "lineItems": [
    //         { "name": "Peanut Butter", "price": "39.0", "collection": "BEST-SELLERS" },
    //         { "name": "Banana Cake", "price": "34.99", "collection": "DEFAULT" },
    //         { "name": "Cocoa", "price": "34.99", "collection": "KETO" },
    //         { "name": "Fruity", "price": "-99", "collection": "DEFAULT" }
    //       ]
    //   }
    // }
    //
    // Result
    //
    // {"total": "12.48"}
    //
    const currentPrice = parseFloat(item.price)
    const computedPrice = !nonQualifiedCollections.includes(item.collection) ? currentPrice * discount : currentPrice
    total += computedPrice

    return {
      ...item,
      // CON: Could keep the original price and this new field as the "discountedPrice"
      // so it would make it easier to compare the original price with the discounted one.
      price: computedPrice.toFixed(2),
    }
  })

  return { lineItems: computedCart, total: total.toFixed(2) }
}

// PRO: Simple way of calculating the discount.
export const getDiscount = (items: CartItem[]): number => {
  let qualifiedItemsRelation = 0

  items.forEach((item) => {
    if (qualifiedItemsRelation === UPPER_ELEGIBLE_AMOUNT) {
      return
    }

    if (!nonQualifiedCollections.includes(item.collection)) {
      qualifiedItemsRelation++
    }
  })

  return qualifiedItemsRelation < LOWER_ELEGIBLE_AMOUNT ? 1 : 1 - discountRelation[qualifiedItemsRelation]
}
