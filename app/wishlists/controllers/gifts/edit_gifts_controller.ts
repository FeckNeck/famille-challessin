import vine from '@vinejs/vine';
import { randomUUID } from 'crypto';
import { HttpContext } from '@adonisjs/core/http';

export default class EditGiftsController {
  static editGiftValidator = vine.create({
    title: vine.string().trim(),
    description: vine.string().trim().optional(),
    url: vine
      .string()
      .trim()
      .url({
        require_protocol: true,
        protocols: ['http', 'https'],
      })
      .optional(),
    price: vine.string().optional(),
    image: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp'],
      })
      .optional(),
  });

  async handle({ params, request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(EditGiftsController.editGiftValidator);

    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .preload('wishlistCategory')
      .where('id', params.id)
      .firstOrFail();

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', params.categoryId)
      .firstOrFail();

    const gift = await wishlistCategory
      ?.related('gifts')
      .query()
      .where('id', params.giftId)
      .firstOrFail();

    if (payload.image) {
      if (!payload.image.isValid) {
        return response.badRequest({ errors: payload.image.errors });
      }

      const fileName = `${randomUUID()}.${payload.image.extname}`;

      // await payload.image.move(app.makePath('public/uploads'), {
      //   name: fileName,
      // })
      await payload.image.moveToDisk(fileName);

      gift?.merge({ image: fileName });
    }

    gift?.merge({
      title: payload.title,
      description: payload.description,
      url: payload.url,
      price: payload.price,
    });
    await gift?.save();
    return response.redirect().back();
  }
}
