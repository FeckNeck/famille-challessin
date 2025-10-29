import Wishlist from '#wishlists/models/wishlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShowWishlistsController {
  async render({ params, inertia }: HttpContext) {
    const wishlist = await Wishlist.query()
      .where('slug', params.slug)
      .preload('wishlistCategory', (builder) =>
        builder.preload('gifts', (giftBuilder) => giftBuilder.orderBy('created_at', 'desc'))
      )
      .preload('wishlistTheme')
      .firstOrFail()
    return inertia.render('wishlist/show/main', wishlist.toJSON())
  }
}
