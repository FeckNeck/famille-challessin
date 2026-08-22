import { BaseTransformer } from '@adonisjs/core/transformers'
import Wishlist from '#wishlists/models/wishlist'
import UserTransformer from '#auth/transformers/user_transformer'
import WishlistThemeTransformer from '#wishlists/transformers/wishlist_theme_transformer'
import WishlistCategoryTransformer from '#wishlists/transformers/wishlist_category_transformer'

export default class WishlistTransformer extends BaseTransformer<Wishlist> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'eventDate',
        'isPublic',
        'image',
        'imageUrl',
        'url',
        'userId',
        'themeId',
        'createdAt',
        'updatedAt',
      ]),
      eventDate: this.resource.eventDate?.toFormat('yyyy-MM-dd') ?? null,
      user: this.resource.user ? UserTransformer.transform(this.resource.user) : undefined,
      theme: this.resource.wishlistTheme
        ? WishlistThemeTransformer.transform(this.resource.wishlistTheme)
        : undefined,
      categories: this.resource.wishlistCategory
        ? WishlistCategoryTransformer.transform(this.resource.wishlistCategory).depth(2)
        : undefined,
    }
  }
}
