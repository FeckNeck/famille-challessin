import { HttpContext } from '@adonisjs/core/http'

export default class CreateWishlistsController {
  async handle({ response, auth }: HttpContext) {
    const wishlist = await auth.user?.related('wishlists').create({})
    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
