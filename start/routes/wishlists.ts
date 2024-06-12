import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const IndexWishlistsController = () => import('#wishlists/controllers/index_wishlists_controller')
const ShowWishlistsController = () => import('#wishlists/controllers/show_wishlists_controller')
const CreateWishlistsController = () => import('#wishlists/controllers/create_wishlists_controller')

const UpdateGiftsController = () => import('#gifts/controllers/update_gifts_controller')

router.get('wishlists', [IndexWishlistsController, 'render']).as('wishlists.index')
router
  .get('wishlists/create', [CreateWishlistsController, 'render'])
  .as('wishlists.create')
  .use(middleware.auth())
router.post('wishlists', [CreateWishlistsController, 'handle']).as('wishlists.store')
router.get('wishlists/:id', [ShowWishlistsController, 'render']).as('wishlists.show')
router.patch('gifts/:id', [UpdateGiftsController, 'handle']).as('gifts.update')
