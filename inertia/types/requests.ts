export interface Gift {
  id: string
  title: string
  description: string
  categoryId: string
  price: string
  url: string
  image: string
  giverId: string
  giverName: string
  giverEmail: string
}

export interface WishlistTheme {
  id: number
  name: string
  icon: string
  count: string
  color: string
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
  icon: string
  color: string
}

/**
 * Sort order. -1 is descending, 1 is ascending
 */
export type SortOrder = 'asc' | 'desc'
export interface WishlistFilter {
  username: string
  theme: string
  title: string
  order: SortOrder
  orderBy: 'name' | 'created' | 'updated' | 'event_date'
  page: number
}
