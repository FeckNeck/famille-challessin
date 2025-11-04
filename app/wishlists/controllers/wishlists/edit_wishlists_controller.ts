import vine from '@vinejs/vine';
import { DateTime } from 'luxon';
import { randomUUID } from 'crypto';
import { HttpContext } from '@adonisjs/core/http';

import WishlistTheme from '#wishlists/models/wishlist_theme';
import type { IWishlistThemes } from '#wishlists/enums/wishlist_themes';
import WishlistTransformer from '#modules/wishlists/transformers/wishlist_transformer';
import WishlistThemeTransformer from '#modules/wishlists/transformers/wishlist_theme_transformer';
import { ToastType } from '#core/enums/toast';

export default class EditWishlistsController {
  static createWishlistValidator = vine.create({
    id: vine.string(),
    title: vine.string().optional().requiredWhen('isPublic', '=', true),
    description: vine.string().optional().requiredWhen('isPublic', '=', true),
    isPublic: vine.boolean().optional(),
    themeId: vine.string().transform((value) => +value as IWishlistThemes),
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
  });

  async render({ inertia, params, auth, response }: HttpContext) {
    const themes = await WishlistTheme.all();

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .preload('wishlistTheme')
      .preload('wishlistCategory', (query) => {
        query.preload('gifts');
      })
      .where('slug', params.slug)
      .first();

    return inertia.render('wishlist/edit/main', {
      wishlist: WishlistTransformer.transform(wishlist!),
      themes: WishlistThemeTransformer.transform(themes),
    });
  }

  async handle({ request, response, params, auth, session }: HttpContext) {
    const payload = await request.validateUsing(EditWishlistsController.createWishlistValidator);

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .where('id', params.id)
      .firstOrFail();

    if (payload.image) {
      if (!payload.image.isValid) {
        return response.badRequest({ errors: payload.image.errors });
      }

      const fileName = `${randomUUID()}.${payload.image.extname}`;

      await payload.image.moveToDisk(fileName);

      wishlist?.merge({ image: fileName });
    }

    wishlist?.merge({
      title: payload.title,
      description: payload.description,
      isPublic: payload.isPublic,
      themeId: payload.themeId,
      eventDate: payload.eventDate,
    });

    await wishlist?.save();

    session.flash('toasts', {
      type: ToastType.SUCCESS,
      message: 'La liste de souhaits a été mise à jour avec succès.',
    });

    return response.redirect().back();
  }
}
