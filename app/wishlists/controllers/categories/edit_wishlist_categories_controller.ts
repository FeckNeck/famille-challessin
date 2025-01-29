import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import WishlistCategoryRepository from '#wishlists/repositories/wishlist_category_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EditWishlistsCategoryController {
  static updateWishlistCategoryValidator = vine.compile(
    vine.object({
      name: vine.string(),
    })
  )

  constructor(protected wishlistCategoryRepository: WishlistCategoryRepository) {}

  async handle({ response, bouncer, request }: HttpContext) {
    const payload = await request.validateUsing(
      EditWishlistsCategoryController.updateWishlistCategoryValidator
    )

    const { id: wishlistId, categoryId } = request.params()

    const category = await this.wishlistCategoryRepository.findOneByWishlistId(
      wishlistId,
      categoryId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', category.wishlist)

    await category.merge(payload).save()

    return response.redirect().back()
  }
}
