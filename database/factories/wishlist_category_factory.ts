import factory from '@adonisjs/lucid/factories';

import { GiftFactory } from '#database/factories/gift_factory';
import WishlistCategory from '#wishlists/models/wishlist_category';

export const WishlistCategoryFactory = factory
  .define(WishlistCategory, async ({ faker }) => {
    return {
      name: faker.lorem.words(3),
    };
  })
  .relation('gifts', () => GiftFactory)
  .build();
