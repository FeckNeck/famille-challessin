import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import GiftRepository from '#wishlists/repositories/gift_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BookGiftsController {
  static bookGiftValidator = vine.compile(
    vine.object({
      giverName: vine.string().trim().toLowerCase(),
      giverEmail: vine.string().trim().toLowerCase().email().optional(),
    })
  )

  constructor(protected giftRepository: GiftRepository) {}

  async handle({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(BookGiftsController.bookGiftValidator)

    const { id: wishlistId, categoryId, giftId } = request.params()

    const gift = await this.giftRepository.findOneByCategoryIdAndWishlistId(
      wishlistId,
      categoryId,
      giftId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', gift.category.wishlist)

    if (auth.isAuthenticated && !gift.giverId) {
      gift.giverId = auth.user!.id
    }

    await gift.merge(payload).save()
    return response.redirect().back()
  }
}
