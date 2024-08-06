import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const EditWishlistsController = () =>
  import('#wishlists/controllers/wishlists/edit_wishlists_controller')
const IndexWishlistsController = () =>
  import('#wishlists/controllers/wishlists/index_wishlists_controller')
const ShowWishlistsController = () =>
  import('#wishlists/controllers/wishlists/show_wishlists_controller')
const CreateWishlistsController = () =>
  import('#wishlists/controllers/wishlists/create_wishlists_controller')

const CreateWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/create_wishlist_categories')
const EditWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/edit_wishlist_categories')
const RemoveWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/remove_wishlist_categories')

router
  .delete('wishlists/:id/categories/:categoryId', [RemoveWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.delete')

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

router
  .post('wishlists/:id/categories', [CreateWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.store')
router
  .put('wishlists/:id/categories/:categoryId', [EditWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.update')
