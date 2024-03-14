import User from '#models/user'
import { RegisterUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, auth, inertia }: HttpContext) {
    const { email, password, username } = await request.validateUsing(RegisterUserValidator)
    const user = await User.create({ email, password, username })
    await auth.use('web').login(user)
    return inertia.location('/')
  }
}
