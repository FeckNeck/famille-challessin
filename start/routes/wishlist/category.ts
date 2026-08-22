import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router
  .delete('wishlists/:id/categories/:categoryId', [
    controllers.wishlists.categories.RemoveWishlistCategories,
    'handle',
  ])
  .as('wishlists.categories.delete')
  .use(middleware.auth())

router
  .post('wishlists/:id/categories', [
    controllers.wishlists.categories.CreateWishlistCategories,
    'handle',
  ])
  .as('wishlists.categories.store')
  .use(middleware.auth())

router
  .put('wishlists/:id/categories/:categoryId', [
    controllers.wishlists.categories.EditWishlistCategories,
    'handle',
  ])
  .as('wishlists.categories.update')
  .use(middleware.auth())
