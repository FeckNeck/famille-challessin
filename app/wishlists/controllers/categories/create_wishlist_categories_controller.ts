import vine from '@vinejs/vine'
import Wishlist from '#wishlists/models/wishlist'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateWishlistsCategoryController {
  static createWishlistCategoryValidator = vine.compile(
    vine.object({
      name: vine.string(),
    })
  )

  async handle({ response, params, request, bouncer }: HttpContext) {
    const { name } = await request.validateUsing(
      CreateWishlistsCategoryController.createWishlistCategoryValidator
    )

    const wishlist = await Wishlist.findByOrFail('id', params.id)

    await bouncer.with(WishlistPolicy).authorize('edit', wishlist)

    await wishlist.related('wishlistCategory').create({ name })
    return response.redirect().back()
  }
}
