export const WishlistThemes = {
  Christmas: 1,
  Birthday: 2,
  Other: 3,
} as const

export type WishlistThemes = (typeof WishlistThemes)[keyof typeof WishlistThemes]
