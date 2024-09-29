import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterController = () => import('#auth/controllers/register_controller')

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login.render')
    router.post('/login', [LoginController, 'handle']).as('login.handle')
    router.get('/register', [RegisterController, 'render']).as('register.render')
    router.post('/register', [RegisterController, 'handle']).as('register.handle')
  })
  .prefix('auth')
  .as('auth')
  .middleware([middleware.guest()])

router.delete('/logout', [LogoutController, 'handle']).as('auth.logout').use(middleware.auth())
