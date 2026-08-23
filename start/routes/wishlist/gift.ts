import router from '@adonisjs/core/services/router';

import { middleware } from '#start/kernel';
import { controllers } from '#generated/controllers';

router
  .post('wishlists/:id/categories/:categoryId/gifts', [
    controllers.wishlists.gifts.ScrapGifts,
    'handle',
  ])
  .as('gifts.scrap')
  .use(middleware.auth());

router
  .patch('wishlists/:id/categories/:categoryId/gifts/:giftId', [
    controllers.wishlists.gifts.EditGifts,
    'handle',
  ])
  .as('gifts.edit')
  .use(middleware.auth());

router
  .patch('wishlists/:id/categories/:categoryId/gifts/:giftId/book', [
    controllers.wishlists.gifts.BookGifts,
    'handle',
  ])
  .as('gifts.book');

router
  .delete('wishlists/:id/categories/:categoryId/gifts/:giftId', [
    controllers.wishlists.gifts.RemoveGifts,
    'handle',
  ])
  .as('gifts.delete')
  .use(middleware.auth());
