import vine from '@vinejs/vine';
import type { HttpContext } from '@adonisjs/core/http';

import User from '#auth/models/user';

export default class LoginController {
  static validator = vine.create({
    email: vine.string().email(),
    password: vine.string(),
    remember_me: vine.boolean(),
  });

  async render({ response }: HttpContext) {
    return response.redirect().withQs({ modal: 'login' }).back();
  }

  async handle({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator);

    const user = await User.verifyCredentials(email, password);

    if (!user) {
      session.flashErrors({
        E_INVALID_CREDENTIALS: "Aucun compte n'a été trouvé avec les identifiants fournis.",
      });

      return response.redirect().back();
    }

    await auth.use('web').login(user, !!request.input('remember_me'));
    return response.redirect().toPath('/');
  }
}
