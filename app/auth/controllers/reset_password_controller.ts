import ResetPasswordToken from '#auth/models/reset_password_tokens'
import User from '#auth/models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export default class ResetPasswordController {
  static validator = vine.compile(
    vine.object({
      password: vine.string().minLength(8).maxLength(32).confirmed(),
      token: vine.string().trim(),
    })
  )

  async render({ response, request }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL')
    }

    const token = request.param('token')

    console.log(DateTime.now().toSQL())

    ResetPasswordToken.query()
      .where('expires_at', '>', DateTime.now().toSQL())
      .where('token', token)
      .firstOrFail()

    return response.redirect().withQs({ modal: 'reset-password', token: token }).back()
  }

  async handle({ request, response }: HttpContext) {
    const { password, token } = await request.validateUsing(ResetPasswordController.validator)

    const user = await User.query()
      .whereHas('resetPasswordTokens', (query) => {
        query.where('token', token)
      })
      .firstOrFail()

    user.merge({ password })
    await user.save()

    return response.redirect().back()
  }
}
