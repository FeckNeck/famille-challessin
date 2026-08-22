import { BaseTransformer } from '@adonisjs/core/transformers'
import Gift from '#wishlists/models/gift'
import UserTransformer from '#auth/transformers/user_transformer'

export default class WishlistGiftTransformer extends BaseTransformer<Gift> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'price',
        'url',
        'image',
        'imageUrl',
        'giverId',
        'giverName',
        'giverEmail',
        'categoryId',
      ]),
      giver: this.resource.giver ? UserTransformer.transform(this.resource.giver) : undefined,
    }
  }
}
