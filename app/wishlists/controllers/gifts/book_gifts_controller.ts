import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Wishlist from '#wishlists/models/wishlist'

export default class BookGiftsController {
  static bookGiftValidator = vine.compile(
    vine.object({
      giverName: vine.string().trim().toLowerCase(),
      giverEmail: vine.string().trim().toLowerCase().email().optional(),
    })
  )
  async handle({ params, request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(BookGiftsController.bookGiftValidator)

    const wishlist = await Wishlist.query()
      .preload('wishlistCategory')
      .where('id', params.id)
      .firstOrFail()

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', params.categoryId)
      .firstOrFail()

    const gift = await wishlistCategory
      ?.related('gifts')
      .query()
      .where('id', params.giftId)
      .firstOrFail()

    if (auth.user?.id) {
      gift!.giverId = auth.user.id
    }

    gift?.merge(payload)
    await gift?.save()
    return response.redirect().toPath(wishlist!.url!)
  }
}
