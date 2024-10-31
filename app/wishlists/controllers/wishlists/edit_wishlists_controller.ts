import { cuid } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import vine from '@vinejs/vine'
import Wishlist from '#wishlists/models/wishlist'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'

export default class EditWishlistsController {
  static createWishlistValidator = vine.compile(
    vine.object({
      id: vine.string(),
      title: vine.string().optional().requiredWhen('isPublic', '=', true),
      description: vine.string().optional().requiredWhen('isPublic', '=', true),
      isPublic: vine.boolean().optional(),
      themeId: vine.string().transform((value) => +value as WishlistThemes),
      eventDate: vine
        .date()
        .transform((value) => DateTime.fromJSDate(value))
        .optional()
        .requiredWhen('isPublic', '=', true),
      image: vine
        .file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg', 'webp'],
        })
        .optional(),
    })
  )

  async render({ inertia, params }: HttpContext) {
    const themes = await WishlistTheme.all()

    const wishlist = await Wishlist.query()
      .where('id', params.id)
      .preload('wishlistTheme')
      .preload('wishlistCategory', (query) => {
        query.preload('gifts')
      })
      .firstOrFail()

    return inertia.render('wishlist/edit/main', {
      wishlist,
      themes,
    })
  }

  async handle({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(EditWishlistsController.createWishlistValidator)

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .where('id', params.id)
      .firstOrFail()

    if (payload.image) {
      if (!payload.image.isValid) {
        return response.badRequest({ errors: payload.image.errors })
      }

      const fileName = `${cuid()}.${payload.image.extname}`

      await payload.image.move(app.makePath('public/uploads'), {
        name: fileName,
      })

      wishlist?.merge({ image: fileName })
    }

    wishlist?.merge({
      title: payload.title,
      description: payload.description,
      isPublic: payload.isPublic,
      themeId: payload.themeId,
      eventDate: payload.eventDate,
    })

    await wishlist?.save()
    return response.redirect().back()
  }
}
