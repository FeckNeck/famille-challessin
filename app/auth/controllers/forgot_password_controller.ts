import { type HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import string from '@poppinss/utils/string'
import User from '#auth/models/user'
import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import router from '@adonisjs/core/services/router'

export default class ForgotPasswordController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
    })
  )

  async render({ response }: HttpContext) {
    return response.redirect().withQs({ modal: 'forgot-password' }).back()
  }

  async handle({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(ForgotPasswordController.validator)

    // create a new token
    const token = string.random(64)
    const user = await User.findByOrFail('email', email)
    await user.related('resetPasswordTokens').create({ token })

    // generate the reset link
    const resetLink = router
      .builder()
      .prefixUrl(env.get('DOMAIN'))
      .params({ token: token })
      .makeSigned('auth.reset_password.render', { expiresIn: '1h' })

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
