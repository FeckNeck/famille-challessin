import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RemoveGiftsController = () => import('#wishlists/controllers/gifts/remove_gifts')
const ScrapGiftsController = () => import('#wishlists/controllers/gifts/scrap_gifts_controller')
const updateGiftsController = () => import('#wishlists/controllers/gifts/update_gifts_controller')

router
  .post('wishlists/:id/categories/:categoryId/gifts', [ScrapGiftsController, 'handle'])
  .as('gifts.scrap')
  .use(middleware.auth())

router
  .patch('wishlists/:id/categories/:categoryId/gifts/:giftId', [updateGiftsController, 'handle'])
  .as('gifts.update')
  .use(middleware.auth())

router
  .delete('wishlists/:id/categories/:categoryId/gifts/:giftId', [RemoveGiftsController, 'handle'])
  .as('gifts.delete')
  .use(middleware.auth())
