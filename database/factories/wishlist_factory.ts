import factory from '@adonisjs/lucid/factories'
import Wishlist from '#wishlists/models/wishlist'
import { DateTime } from 'luxon'
import { WishlistCategoryFactory } from '#database/factories/wishlist_category_factory'

export const WishlistFactory = factory
  .define(Wishlist, async ({ faker }) => {
    return {
      title: faker.lorem.words(10),
      description: faker.lorem.paragraph(),
      themeId: faker.number.int({ min: 1, max: 3 }),
      eventDate: DateTime.now().plus({ days: 30 }),
      isPublic: faker.datatype.boolean(),
      imageUrl: faker.image.url(),
    }
  })
  .relation('wishlistCategory', () => WishlistCategoryFactory)
  .build()
