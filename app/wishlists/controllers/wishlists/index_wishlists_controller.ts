import { HttpContext } from '@adonisjs/core/http'

export default class IndexWishlistsController {
  async render({ auth, inertia }: HttpContext) {
    const wishlists = await auth.user?.related('wishlists').query()
    return inertia.render('wishlist/main', { wishlists })
  }
}
