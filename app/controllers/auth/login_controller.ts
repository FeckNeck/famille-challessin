import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, inertia, session, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('home')
    } catch (error) {
      session.flash('errors', 'Invalid credentials')
      return response.redirect().back()
    }
  }
}
