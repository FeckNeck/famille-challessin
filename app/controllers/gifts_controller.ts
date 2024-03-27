import Gift from '#models/gift'
import { UpdateGiftValidator } from '#validators/gift'
import type { HttpContext } from '@adonisjs/core/http'

export default class GiftsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    const gift = await Gift.findOrFail(params.id)
    const payload = await request.validateUsing(UpdateGiftValidator)
    if (payload.giverId !== auth.user?.id) {
      return 'You are not authorized to update this gift'
    }

    gift.merge(payload)
    await gift.save()
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
