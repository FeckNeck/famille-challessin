import vine from '@vinejs/vine';
import { HttpContext } from '@adonisjs/core/http';

export default class EditWishlistsCategoryController {
  static updateWishlistCategoryValidator = vine.create({
    name: vine.string(),
  });

  async handle({ response, auth, request }: HttpContext) {
    const payload = await request.validateUsing(
      EditWishlistsCategoryController.updateWishlistCategoryValidator,
    );

    const { id, categoryId } = request.params();

    const wishlist = await auth.user?.related('wishlists').query().where('id', id).firstOrFail();

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', categoryId)
      .firstOrFail();

    await wishlistCategory?.merge(payload).save();

    return response.redirect().back();
  }
}
