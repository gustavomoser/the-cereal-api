import { CartItem, Input } from 'model'

export const peanutButter: CartItem = {
  name: 'Peanut Butter',
  price: '39',
  collection: 'BEST-SELLERS',
}
export const bananaCake: CartItem = { name: 'Banana Cake', price: '34.99', collection: 'DEFAULT' }
export const cocoa: CartItem = { name: 'Cocoa', price: '34.99', collection: 'KETO' }
export const fruity: CartItem = { name: 'Fruity', price: '32', collection: 'DEFAULT' }

export const inputCart: Input = {
  cart: {
    reference: '2d832fe0-6c96-4515-9be7-4c00983539c1',
    lineItems: [peanutButter, bananaCake, cocoa, fruity],
  },
}

export const getAppliedDiscount = (price: string, discount: number): string =>
  (Math.abs(parseFloat(price)) * (1 - discount)).toFixed(2)
