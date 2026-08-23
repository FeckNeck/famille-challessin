import type { User, Wishlist, WishlistTheme } from './requests';

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
}

export interface HomeResponse {
  meta: Meta;
  users: User[];
  wishlists: Wishlist[];
  themes: WishlistTheme[];
}
