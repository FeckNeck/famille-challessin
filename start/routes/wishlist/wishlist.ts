/* eslint-disable prettier/prettier */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CreateWishlistsController = () =>
  import('#wishlists/controllers/wishlists/create_wishlists_controller')
const EditWishlistsController = () =>
  import('#wishlists/controllers/wishlists/edit_wishlists_controller')
const IndexWishlistsController = () =>
  import('#wishlists/controllers/wishlists/index_wishlists_controller')
const ShowWishlistsController = () =>
  import('#wishlists/controllers/wishlists/show_wishlists_controller')

router.get('wishlists', [IndexWishlistsController, 'render']).as('wishlists.index')
router.get('wishlists/create', [CreateWishlistsController, 'handle']).as('wishlists.create').use(middleware.auth())
router.get('wishlists/:id', [ShowWishlistsController, 'render']).as('wishlists.show')
router.get('wishlists/:id/edit', [EditWishlistsController, 'render']).as('wishlists.edit').use(middleware.auth())

router.post('wishlists', [CreateWishlistsController, 'handle']).as('wishlists.store').use(middleware.auth())

router.put('wishlists/:id', [EditWishlistsController, 'handle']).as('wishlists.update').use(middleware.auth())
