import factory from '@adonisjs/lucid/factories'
import WishlistCategory from '#models/wishlist_category'
import { GiftFactory } from './gift_factory.js'

export const WishlistCategoryFactory = factory
  .define(WishlistCategory, async ({ faker }) => {
    return {
      name: faker.lorem.words(3),
    }
  })
  .relation('gifts', () => GiftFactory)
  .build()
