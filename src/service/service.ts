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

  const computedCart: CartItem[] = items.map((item) => {
    const price = parseFloat(item.price)
    const computedPrice = !nonQualifiedCollections.includes(item.collection) ? price * discount : price
    total += computedPrice

    return {
      ...item,
      price: computedPrice.toFixed(2),
    }
  })

  return { lineItems: computedCart, total: total.toFixed(2) }
}

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
