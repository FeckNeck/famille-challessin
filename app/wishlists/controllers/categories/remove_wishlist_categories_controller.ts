import { inject } from '@adonisjs/core'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import WishlistCategoryRepository from '#wishlists/repositories/wishlist_category_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RemoveWishlistsCategoryController {
  constructor(protected wishlistCategoryRepository: WishlistCategoryRepository) {}

  async handle({ response, bouncer, params }: HttpContext) {
    const { id: wishlistId, categoryId } = params

    const category = await this.wishlistCategoryRepository.findOneByWishlistId(
      wishlistId,
      categoryId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', category.wishlist)

    await category.delete()

    return response.redirect().back()
  }
}
