import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const EditWishlistsController = () => import('#wishlists/controllers/edit_wishlists_controller')
const IndexWishlistsController = () => import('#wishlists/controllers/index_wishlists_controller')
const ShowWishlistsController = () => import('#wishlists/controllers/show_wishlists_controller')
const CreateWishlistsController = () => import('#wishlists/controllers/create_wishlists_controller')

const UpdateGiftsController = () => import('#gifts/controllers/update_gifts_controller')

router.get('wishlists', [IndexWishlistsController, 'render']).as('wishlists.index')
router
  .get('wishlists/create', [CreateWishlistsController, 'handle'])
  .as('wishlists.create')
  .use(middleware.auth())

router
  .get('wishlists/:id/edit', [EditWishlistsController, 'render'])
  .as('wishlists.edit')
  .as('wishlists.edit')
  .use(middleware.auth())

router.put('wishlists/:id', [EditWishlistsController, 'handle']).as('wishlists.update')

router.post('wishlists', [CreateWishlistsController, 'handle']).as('wishlists.store')
router.get('wishlists/:id', [ShowWishlistsController, 'render']).as('wishlists.show')

router.patch('gifts/:id', [UpdateGiftsController, 'handle']).as('gifts.update')
