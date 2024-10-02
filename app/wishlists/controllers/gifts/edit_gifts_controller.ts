import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class EditGiftsController {
  static editGiftValidator = vine.compile(
    vine.object({
      title: vine.string().trim(),
      description: vine.string().trim().optional(),
      url: vine
        .string()
        .trim()
        .url({
          require_protocol: true,
          protocols: ['http', 'https'],
        })
        .optional(),
      price: vine.string().optional(),
      imageUrl: vine.string().trim().optional(),
    })
  )

  async handle({ params, request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(EditGiftsController.editGiftValidator)

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

    gift?.merge(payload)
    await gift?.save()
    return response.redirect().back()
  }
}
