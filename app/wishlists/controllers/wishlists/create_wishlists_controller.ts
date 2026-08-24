import { HttpContext } from '@adonisjs/core/http';

export default class CreateWishlistsController {
  async handle({ response, auth }: HttpContext) {
    const wishlist = await auth.user!.related('wishlists').create({});
    await wishlist.merge({ slug: wishlist.id }).save();
    return response.redirect().toRoute('wishlists.edit', { slug: wishlist.id });
  }
}
