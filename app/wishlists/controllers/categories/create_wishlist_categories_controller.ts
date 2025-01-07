import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateWishlistsCategoryController {
  static createWishlistCategoryValidator = vine.compile(
    vine.object({
      name: vine.string(),
    })
  )

  async handle({ response, auth, params, request }: HttpContext) {
    const { name } = await request.validateUsing(
      CreateWishlistsCategoryController.createWishlistCategoryValidator
    )

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await wishlist?.related('wishlistCategory').create({
      name,
      wishlistId: wishlist!.id,
    })
    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
