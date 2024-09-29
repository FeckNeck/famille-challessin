import type { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import vine from '@vinejs/vine'

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      email: vine
        .string()
        .trim()
        .toLowerCase()
        .email()
        .unique(async (db, value) => !(await db.from('users').where('email', value).first())),
      password: vine.string().minLength(8).maxLength(32).confirmed(),
      username: vine
        .string()
        .trim()
        .toLowerCase()
        .minLength(3)
        .maxLength(32)
        .unique(async (db, value) => !(await db.from('users').where('username', value).first())),
    })
  )

  async render({ response }: HttpContext) {
    return response.redirect().withQs({ modal: 'register' }).back()
  }

  async handle({ request, auth, response }: HttpContext) {
    const { email, password, username } = await request.validateUsing(RegisterController.validator)
    const user = await User.create({ email, password, username })
    await auth.use('web').login(user)
    return response.redirect().toPath('/')
  }
}
