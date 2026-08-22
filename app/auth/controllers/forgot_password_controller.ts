import { type HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import string from '@poppinss/utils/string'
import User from '#auth/models/user'
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import { signedUrlFor } from '@adonisjs/core/services/url_builder'
import { errors as authErrors } from '@adonisjs/auth'

export default class ForgotPasswordController {
  static validator = vine.create({
    email: vine.string().email(),
  })

  async render({ response }: HttpContext) {
    return response.redirect().withQs({ modal: 'forgot-password' }).back()
  }

  async handle({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(ForgotPasswordController.validator)

    // create a new token
    const token = string.random(64)
    const user = await User.findBy('email', email)
    if (!user) {
      throw new authErrors.E_INVALID_CREDENTIALS('Invalid email')
    }
    await user.related('resetPasswordTokens').create({ token })

    // generate the reset link
    const resetLink = signedUrlFor(
      'auth.reset_password.render',
      { token: token },
      {
        expiresIn: '1h',
        prefixUrl: env.get('DOMAIN'),
      }
    )

    // send email
    await mail.sendLater((message) => {
      message
        .to(user.email)
        .subject('Reset Password')
        .text(
          `Hello ${user.username},\n\nYou can reset your password by clicking on the following link: ${resetLink}`
        )
    })

    return response.redirect().back()
  }
}
