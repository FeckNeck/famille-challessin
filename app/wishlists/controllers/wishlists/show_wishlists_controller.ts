import { HttpContext } from '@adonisjs/core/http';

import Wishlist from '#wishlists/models/wishlist';
import WishlistTransformer from '#modules/wishlists/transformers/wishlist_transformer';

export default class ShowWishlistsController {
  async render({ params, inertia }: HttpContext) {
    const wishlist = await Wishlist.query()
      .where('id', params.id)
      .preload('wishlistCategory', (builder) => builder.preload('gifts'))
      .preload('wishlistTheme')
      .firstOrFail();

    return inertia.render('wishlist/show/main', {
      wishlist: WishlistTransformer.transform(wishlist),
    });
  }
}
