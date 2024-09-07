import { DateTime } from 'luxon'

export interface AuthForm {
  email: string
  username?: string
  password: string
  password_confirmation?: string
}

export interface Gift {
  id: string
  title: string
  description: string | null
  categoryId: string
  price: number
  link: string | null
  image: string
  isReserved: boolean
  giverId: string | null
  giverName: string
  giverEmail: string | null
}

export interface WishlistTheme {
  id: number
  name: string
  icon: string
  count: string
  iconColor: string
}

export interface WishlistCategory {
  id: string
  name: string
  wishlistId: string
  gifts: Gift[]
}

export interface Wishlist {
  id: string
  userId: string
  title: string
  description: string
  eventDate: Date
  isPublic: boolean
  imageUrl: string
  categories: WishlistCategory[]
  theme: WishlistTheme
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  roleId: number
  wishlists: Wishlist[]
  count: string
  iconColor: string
}

/**
 * Sort order. -1 is descending, 1 is ascending
 */
export type SortOrder = 'asc' | 'desc'
export interface WishlistFilter {
  username: string
  theme: string
  search: string
  order: SortOrder
  orderBy: 'name' | 'created' | 'updated' | 'event_date'
  page: number
}
