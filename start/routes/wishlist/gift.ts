import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BookGiftsController = () => import('#wishlists/controllers/gifts/book_gifts_controller')
const EditGiftsController = () => import('#wishlists/controllers/gifts/edit_gifts_controller')
const RemoveGiftsController = () => import('#wishlists/controllers/gifts/remove_gifts')
const ScrapGiftsController = () => import('#wishlists/controllers/gifts/scrap_gifts_controller')

router
  .post('wishlists/:id/categories/:categoryId/gifts', [ScrapGiftsController, 'handle'])
  .as('gifts.scrap')
  .use(middleware.auth())

router
  .patch('wishlists/:id/categories/:categoryId/gifts/:giftId', [EditGiftsController, 'handle'])
  .as('gifts.edit')
  .use(middleware.auth())

router
  .patch('wishlists/:id/categories/:categoryId/gifts/:giftId/book', [BookGiftsController, 'handle'])
  .as('gifts.book')

router
  .delete('wishlists/:id/categories/:categoryId/gifts/:giftId', [RemoveGiftsController, 'handle'])
  .as('gifts.delete')
  .use(middleware.auth())
