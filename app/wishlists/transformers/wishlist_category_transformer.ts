import { BaseTransformer } from '@adonisjs/core/transformers'
import WishlistCategory from '#wishlists/models/wishlist_category'
import WishlistGiftTransformer from './wishlist_gift_transformer.ts'

export default class WishlistCategoryTransformer extends BaseTransformer<WishlistCategory> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'wishlistId', 'createdAt', 'updatedAt']),
      gifts: this.resource.gifts
        ? WishlistGiftTransformer.transform(this.resource.gifts)
        : undefined,
    }
  }
}
