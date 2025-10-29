import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import type User from '#auth/models/user'
import type Wishlist from '#wishlists/models/wishlist'

export default class WishlistPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return !!user
  }

  edit(user: User, wishlist: Wishlist): AuthorizerResponse {
    return user.id === wishlist.userId
  }

  delete(user: User, wishlist: Wishlist): AuthorizerResponse {
    return user.id === wishlist.userId
  }
}
