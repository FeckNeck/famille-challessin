import { HttpContext } from '@adonisjs/core/http'
import Wishlist from '#wishlists/models/wishlist'
import vine from '@vinejs/vine'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import { DateTime } from 'luxon'
import WishlistTheme from '#wishlists/models/wishlist_theme'

export default class EditWishlistsController {
  static createWishlistValidator = vine.compile(
    vine.object({
      title: vine.string(),
      description: vine.string().optional(),
      isPublic: vine.boolean().optional(),
      themeId: vine.enum(WishlistThemes),
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
      .preload('wishlistCategory')
      .firstOrFail()

    return inertia.render('wishlist/edit/main', {
      wishlist,
      themes,
    })
  }

  async handle({ request, response, params }: HttpContext) {
    const wishlist = await Wishlist.findOrFail(params.id)

    const payload = await request.validateUsing(EditWishlistsController.createWishlistValidator)

    wishlist.merge(payload)
    await wishlist.save()

    return response.redirect().toRoute('wishlists.edit', { id: wishlist.id })
  }
}
