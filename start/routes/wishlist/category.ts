import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CreateWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/create_wishlist_categories')
const EditWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/edit_wishlist_categories')
const RemoveWishlistsCategoryController = () =>
  import('#wishlists/controllers/categories/remove_wishlist_categories')

router
  .delete('wishlists/:id/categories/:categoryId', [RemoveWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.delete')
  .use(middleware.auth())

router
  .post('wishlists/:id/categories', [CreateWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.store')
  .use(middleware.auth())

router
  .put('wishlists/:id/categories/:categoryId', [EditWishlistsCategoryController, 'handle'])
  .as('wishlists.categories.update')
  .use(middleware.auth())
