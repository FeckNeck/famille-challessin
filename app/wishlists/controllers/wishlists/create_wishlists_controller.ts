import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateWishlistsController {
  async handle({ bouncer, response, auth }: HttpContext) {
    await bouncer.with(WishlistPolicy).authorize('create')
    const wishlist = await auth.user!.related('wishlists').create({})
    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
