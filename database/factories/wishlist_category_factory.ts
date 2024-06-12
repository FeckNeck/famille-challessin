import factory from '@adonisjs/lucid/factories'
import WishlistCategory from '#wishlists/models/wishlist_category'
import { GiftFactory } from '#database/factories/gift_factory'

export const WishlistCategoryFactory = factory
  .define(WishlistCategory, async ({ faker }) => {
    return {
      name: faker.lorem.words(3),
    }
  })
  .relation('gifts', () => GiftFactory)
  .build()
