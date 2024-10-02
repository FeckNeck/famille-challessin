import type { HttpContext } from '@adonisjs/core/http'
import Gift from '#wishlists/models/gift'
import vine from '@vinejs/vine'

export default class BookGiftsController {
  static bookGiftValidator = vine.compile(
    vine.object({
      giverName: vine.string().trim().toLowerCase(),
      giverEmail: vine.string().trim().toLowerCase().email().optional(),
    })
  )
  async handle({ params, request, response, auth }: HttpContext) {
    const gift = await Gift.findOrFail(params.id)
    const payload = await request.validateUsing(BookGiftsController.bookGiftValidator)

    if (auth.user?.id) {
      gift.giverId = auth.user.id
    }

    gift.merge(payload)
    await gift.save()
    return response.redirect().back()
  }
}
