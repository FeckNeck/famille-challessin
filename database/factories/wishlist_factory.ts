import factory from '@adonisjs/lucid/factories'
import Wishlist from '#wishlists/models/wishlist'
import { DateTime } from 'luxon'
import { WishlistCategoryFactory } from '#database/factories/wishlist_category_factory'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'

export const WishlistFactory = factory
  .define(Wishlist, async ({ faker }) => {
    return {
      title: faker.lorem.words(10),
      description: faker.lorem.paragraph(),
      themeId: faker.number.int({ min: 1, max: 3 }) as WishlistThemes,
      eventDate: DateTime.now().plus({ days: 30 }),
      isPublic: faker.datatype.boolean(),
      image: faker.image.url(),
    }
  })
  .relation('wishlistCategory', () => WishlistCategoryFactory)
  .build()
