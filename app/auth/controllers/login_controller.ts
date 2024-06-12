import type { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }
}
