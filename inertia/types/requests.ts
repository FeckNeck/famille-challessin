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
  count: string
}

export interface WishlistCategory {
  id: string
  name: string
  gifts: Gift[]
}

export interface Wishlist {
  id: string
  userId: string
  title: string
  description: string | null
  eventDate: string | null
  isPublic: boolean
  image: string
  categories: WishlistCategory[]
  theme: WishlistTheme
}

export interface User {
  id: string
  username: string
  email: string
  roleId: number
  wishlists: Wishlist[]
  count: string
}

export interface UserWishlistFilter {
  username?: string
  title?: string
  theme?: string
}
