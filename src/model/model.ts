export interface CartItem {
  name: string
  price: string
  collection: string
}

export interface Cart {
  reference: string
  lineItems: CartItem[]
}

export interface Input {
  cart: Cart
}

export interface Output {
  lineItems: CartItem[]
  total: string
}

export const nonQualifiedCollections: string[] = ['KETO']

export const LOWER_ELEGIBLE_AMOUNT = 2
export const UPPER_ELEGIBLE_AMOUNT = 5

export const discountRelation: Record<number, number> = {
  [LOWER_ELEGIBLE_AMOUNT]: 0.05,
  3: 0.1,
  4: 0.2,
  [UPPER_ELEGIBLE_AMOUNT]: 0.25,
}
