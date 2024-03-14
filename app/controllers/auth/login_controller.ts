import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, inertia }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return inertia.location('/')
  }
}
