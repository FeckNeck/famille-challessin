import { HttpContext } from '@adonisjs/core/http'

export default class RemoveWishlistsCategoryController {
  async handle({ response, auth, params }: HttpContext) {
    console.log('handle:')
    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', params.categoryId)
      .firstOrFail()

    await wishlistCategory?.delete()

    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
