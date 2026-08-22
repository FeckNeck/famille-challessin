import { BaseTransformer } from '@adonisjs/core/transformers'
import WishlistTheme from '#wishlists/models/wishlist_theme'

export default class WishlistThemeTransformer extends BaseTransformer<WishlistTheme> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'icon', 'color', 'createdAt', 'updatedAt']),
      count: this.resource.$extras.count,
    }
  }
}
