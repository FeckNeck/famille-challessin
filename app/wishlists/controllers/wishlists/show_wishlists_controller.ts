import WishlistTransformer from '#modules/wishlists/transformers/wishlist_transformer'
import Wishlist from '#wishlists/models/wishlist'
import { HttpContext } from '@adonisjs/core/http'

export default class ShowWishlistsController {
  async render({ params, inertia }: HttpContext) {
    const wishlist = await Wishlist.query()
      .where('id', params.id)
      .preload('wishlistCategory', (builder) => builder.preload('gifts'))
      .preload('wishlistTheme')
      .firstOrFail()

    return inertia.render('wishlist/show/main', {
      wishlist: WishlistTransformer.transform(wishlist),
    })
  }
}
