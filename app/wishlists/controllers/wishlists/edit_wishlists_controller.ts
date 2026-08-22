import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import WishlistTransformer from '#modules/wishlists/transformers/wishlist_transformer'
import WishlistThemeTransformer from '#modules/wishlists/transformers/wishlist_theme_transformer'

export default class EditWishlistsController {
  static createWishlistValidator = vine.create({
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

  async render({ inertia, params, auth, response }: HttpContext) {
    const themes = await WishlistTheme.all()

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .preload('wishlistTheme')
      .preload('wishlistCategory', (query) => {
        query.preload('gifts')
      })
      .where('id', params.id)
      .first()

    // TODO: Session flash message
    if (!wishlist) {
      return response.redirect().back()
    }

    wishlist.wishlistCategory.forEach((c) => {
      console.log('category', c.gifts)
    })

    return inertia.render('wishlist/edit/main', {
      wishlist: WishlistTransformer.transform(wishlist),
      themes: WishlistThemeTransformer.transform(themes),
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

      const fileName = `${randomUUID()}.${payload.image.extname}`

      await payload.image.moveToDisk(fileName)

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
