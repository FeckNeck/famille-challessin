import Wishlist from '#wishlists/models/wishlist'
import { HttpContext } from '@adonisjs/core/http'

export default class ShowWishlistsController {
  async render({ params, inertia }: HttpContext) {
    const query = await Wishlist.query()
      .where('id', params.id)
      .preload('wishlistCategory', (builder) => builder.preload('gifts'))
      .firstOrFail()
    const wishlist = query.toJSON()
    return inertia.render('wishlist/show/main', wishlist)
  }
}
