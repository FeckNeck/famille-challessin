import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
// TODO: Add Account Creation in V2.0
// const RegisterController = () => import('#auth/controllers/register_controller')
const ForgotPasswordController = () => import('#auth/controllers/forgot_password_controller')
const ResetPasswordController = () => import('#auth/controllers/reset_password_controller')

router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login.render')
    router.post('/login', [LoginController, 'handle']).as('login.handle')

    // TODO: Add Account Creation in V2.0
    // router.get('/register', [RegisterController, 'render']).as('register.render')
    // router.post('/register', [RegisterController, 'handle']).as('register.handle')

    router
      .get('/forgot-password', [ForgotPasswordController, 'render'])
      .as('forgot_password.render')
    router
      .post('/forgot-password', [ForgotPasswordController, 'handle'])
      .as('forgot_password.handle')

    router
      .get('/reset-password/:token', [ResetPasswordController, 'render'])
      .as('reset_password.render')
    router.post('/reset-password', [ResetPasswordController, 'handle']).as('reset_password.handle')
  })
  .prefix('auth')
  .as('auth')
  .middleware([middleware.guest()])

router.delete('/logout', [LogoutController, 'handle']).as('auth.logout').use(middleware.auth())
