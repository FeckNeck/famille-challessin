import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')

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

router.on('/inertia').renderInertia('home', { version: 6 })

router.get('/modal', async ({ response }) => {
  return response.redirect().withQs({ modal: 'modal' }).back()
})

// router.on('/modal').renderInertia('modal', { version: 6 })
