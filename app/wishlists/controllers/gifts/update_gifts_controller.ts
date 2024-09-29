import type { HttpContext } from '@adonisjs/core/http'
import Gift from '#wishlists/models/gift'
import vine from '@vinejs/vine'

export default class UpdateGiftsController {
  static updateGiftValidator = vine.compile(
    vine.object({
      giverId: vine.string().uuid().optional(),
      giverName: vine.string().trim().toLowerCase(),
      giverEmail: vine.string().trim().toLowerCase().email().optional(),
      isReserved: vine.boolean(),
    })
  )
  async handle({ params, request, response, auth }: HttpContext) {
    const gift = await Gift.findOrFail(params.id)
    const payload = await request.validateUsing(UpdateGiftsController.updateGiftValidator)

    /**
     * The giverId must be the same as the authenticated user id
     */
    if (payload.giverId && payload.giverId !== auth.user?.id) {
      return response.status(403).send('You are not authorized to update this gift')
    }

    gift.merge(payload)
    await gift.save()
    return response.redirect().back()
  }
}
