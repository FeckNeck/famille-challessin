import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const BookGiftsController = () => import('#wishlists/controllers/gifts/book_gifts_controller')
const EditGiftsController = () => import('#wishlists/controllers/gifts/edit_gifts_controller')
const RemoveGiftsController = () => import('#wishlists/controllers/gifts/remove_gifts_controller')
const CreateGiftsController = () => import('#wishlists/controllers/gifts/create_gifts_controller')

router
  .post('wishlists/:id/categories/:categoryId/gifts', [CreateGiftsController, 'handle'])
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
