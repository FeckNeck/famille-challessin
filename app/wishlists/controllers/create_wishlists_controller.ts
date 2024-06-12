import { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import vine from '@vinejs/vine'
import WishlistTheme from '#wishlists/models/wishlist_theme'

export default class CreateWishlistsController {
  static createWishlistValidator = vine.compile(
    vine.object({
      title: vine.string().trim(),
      description: vine.string().trim().optional(),
      themeId: vine.number(),
      eventDate: vine
        .date()
        .optional()
        .transform((value) => DateTime.fromJSDate(value)),
      imageUrl: vine.string().trim().optional(),
    })
  )

  async render({ inertia }: HttpContext) {
    const themes = await WishlistTheme.all()
    return inertia.render('wishlist/create/main', { themes })
  }

  async handle({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(CreateWishlistsController.createWishlistValidator)
    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })
    if (!image) {
      return response.badRequest({ errors: [{ message: 'Image is required' }] })
    }

    if (!image.isValid) {
      return response.badRequest({ errors: image.errors })
    }

    const fileName = `${cuid()}.${image.extname}`

    await image.move(app.makePath('public/uploads'), {
      name: fileName,
    })

    payload.imageUrl = image.fileName

    await auth.user?.related('wishlists').create(payload)
    return response.redirect().back()
  }
}
