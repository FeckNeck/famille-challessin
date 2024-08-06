import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class EditWishlistsCategoryController {
  static updateWishlistCategoryValidator = vine.compile(
    vine.object({
      id: vine.string(),
      wishlistId: vine.string(),
      name: vine.string().optional(),
    })
  )

  async handle({ response, auth, params, request }: HttpContext) {
    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const payload = await request.validateUsing(
      EditWishlistsCategoryController.updateWishlistCategoryValidator
    )

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', params.categoryId)
      .firstOrFail()

    await wishlistCategory?.merge(payload).save()

    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
