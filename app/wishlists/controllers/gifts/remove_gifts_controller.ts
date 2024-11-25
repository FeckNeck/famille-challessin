import { HttpContext } from '@adonisjs/core/http'

export default class RemoveGiftsController {
  async handle({ response, auth, params }: HttpContext) {
    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
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

    await gift?.delete()
    return response.redirect().back()
  }
}
