import { cuid } from '@adonisjs/core/helpers'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import Wishlist from '#wishlists/models/wishlist'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import type { HttpContext } from '@adonisjs/core/http'
import type { WishlistThemes } from '#wishlists/enums/wishlist_themes'

export default class EditWishlistsController {
  static validator = vine.compile(
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

  async render({ inertia, params, bouncer }: HttpContext) {
    const themes = await WishlistTheme.all()

    const wishlist = await Wishlist.findByOrFail('id', params.id)
    await bouncer.with(WishlistPolicy).authorize('edit', wishlist)

    await wishlist.load((loader) => {
      loader
        .load('wishlistTheme')
        .load('wishlistCategory', (builder) =>
          builder.preload('gifts', (giftBuilder) => giftBuilder.orderBy('created_at', 'desc'))
        )
    })

    return inertia.render('wishlist/edit/main', {
      wishlist,
      themes,
    })
  }

  async handle({ request, response, params, bouncer }: HttpContext) {
    const payload = await request.validateUsing(EditWishlistsController.validator)

    const wishlist = await Wishlist.findByOrFail('id', params.id)
    await bouncer.with(WishlistPolicy).authorize('edit', wishlist)

    if (payload.image) {
      if (!payload.image.isValid) {
        return response.badRequest({ errors: payload.image.errors })
      }

      const fileName = `${cuid()}.${payload.image.extname}`

      await payload.image.moveToDisk(fileName)

      wishlist.merge({ image: fileName })
    }

    wishlist.merge({
      title: payload.title,
      description: payload.description,
      isPublic: payload.isPublic,
      themeId: payload.themeId,
      eventDate: payload.eventDate,
    })

    await wishlist.save()
    return response.redirect().back()
  }
}
