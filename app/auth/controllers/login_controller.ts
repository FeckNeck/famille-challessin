import type { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
      remember_me: vine.boolean(),
    })
  )

  async render({ inertia, response, session, route, request }: HttpContext) {
    session.flashMessages.merge({
      errors: [{ message: 'Titou is the best' }],
    })
    console.log(request.headers())
    return response.redirect().toPath('/')
  }

  async handle({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user, !!request.input('remember_me'))
    return response.redirect().toPath('/')
  }
}
