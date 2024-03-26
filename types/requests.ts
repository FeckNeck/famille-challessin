export interface AuthForm {
  email: string
  username?: string
  password: string
  password_confirmation?: string
}

export interface Gift {
  id: number
  title: string
  description: string | null
  price: number
  link: string | null
  image: string
  isReserved: boolean
  giverId: number | null
  giverName: string
  giverEmail: string | null
}

export interface WishlistTheme {
  id: number
  name: string
  count: string
}

export interface Wishlist {
  id: number
  userId: number
  title: string
  description: string | null
  eventDate: Date | null
  isPublic: boolean
  image: string
  gifts: Gift[]
  theme: WishlistTheme
}

export interface User {
  id: number
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
