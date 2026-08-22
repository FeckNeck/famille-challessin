/* eslint-disable prettier/prettier */
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .get('wishlists/create', [controllers.wishlists.wishlists.CreateWishlists, 'handle'])
  .as('wishlists.create')
  .use(middleware.auth())
router
  .get('wishlists/:id', [controllers.wishlists.wishlists.ShowWishlists, 'render'])
  .as('wishlists.show')
  .use(middleware.wishlist())
router
  .get('wishlists/:id/edit', [controllers.wishlists.wishlists.EditWishlists, 'render'])
  .as('wishlists.edit')
  .use(middleware.auth())

router
  .post('wishlists', [controllers.wishlists.wishlists.CreateWishlists, 'handle'])
  .as('wishlists.store')
  .use(middleware.auth())

router
  .put('wishlists/:id', [controllers.wishlists.wishlists.EditWishlists, 'handle'])
  .as('wishlists.update')
  .use(middleware.auth())
