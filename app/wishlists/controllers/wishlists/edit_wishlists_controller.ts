import { HttpContext } from '@adonisjs/core/http'
import Wishlist from '#wishlists/models/wishlist'
import vine from '@vinejs/vine'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import { DateTime } from 'luxon'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export default class EditWishlistsController {
  static createWishlistValidator = vine.compile(
    vine.object({
      id: vine.string(),
      title: vine.string(),
      description: vine.string().optional(),
      isPublic: vine.boolean().optional(),
      themeId: vine.number().in(Object.values(WishlistThemes)).optional(),
      eventDate: vine
        .date()
        .transform((value) => DateTime.fromJSDate(value))
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

  async handle({ request, response, params }: HttpContext) {
    const wishlist = await Wishlist.findOrFail(params.id)

    const payload = await request.validateUsing(EditWishlistsController.createWishlistValidator)

    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (image) {
      if (!image.isValid) {
        return response.badRequest({ errors: image.errors })
      }

      const fileName = `${cuid()}.${image.extname}`

      await image.move(app.makePath('public/uploads'), {
        name: fileName,
      })

      payload.image = fileName
    }

    wishlist.merge(payload)
    await wishlist.save()

    return response.redirect().toRoute('wishlists.edit', { id: wishlist.id })
  }
}
