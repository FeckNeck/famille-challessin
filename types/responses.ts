import type { Wishlist } from './main.js'

export interface Meta {
  total: number
  perPage: number
  currentPage: number
}

export interface HomeResponse {
  meta: Meta
  usernames: string[]
  wishlists: Wishlist[]
}
