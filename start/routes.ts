import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'
const AssetsController = () => import('#controllers/assets_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const WishListsController = () => import('#controllers/wish_lists_controller')

router.get('/img/*', [AssetsController, 'index']).as('img')

router.get('/login', [LoginController, 'create']).as('auth.login.create').use(middleware.guest())
router.post('/login', [LoginController, 'store']).as('auth.login.store').use(middleware.guest())
router
  .get('/register', [RegisterController, 'create'])
  .as('auth.register.create')
  .use(middleware.guest())
router
  .post('/register', [RegisterController, 'store'])
  .as('auth.register.store')
  .use(middleware.guest())
router.delete('/logout', [LogoutController, 'destroy']).as('auth.logout').use(middleware.auth())

router.on('/').renderInertia('home/main', { version: 6 })

router
  .resource('wishlists', WishListsController)
  .use(['create', 'store', 'update', 'destroy', 'show'], middleware.auth())

// router.get('/modal', async ({ response }) => {
//   return response.redirect().withQs({ modal: 'modal' }).back()
// })

// router.on('/modal').renderInertia('modal', { version: 6 })
