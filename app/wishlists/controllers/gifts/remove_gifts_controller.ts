import { inject } from '@adonisjs/core'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import GiftRepository from '#wishlists/repositories/gift_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RemoveGiftsController {
  constructor(protected giftRepository: GiftRepository) {}

  async handle({ response, params, bouncer }: HttpContext) {
    const { id: wishlistId, categoryId, giftId } = params

    const gift = await this.giftRepository.findOneByCategoryIdAndWishlistId(
      wishlistId,
      categoryId,
      giftId
    )
    await bouncer.with(WishlistPolicy).authorize('edit', gift.category.wishlist)

    await gift.delete()

    return response.redirect().back()
  }
}
