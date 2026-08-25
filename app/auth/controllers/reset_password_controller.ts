import vine from '@vinejs/vine';
import { DateTime } from 'luxon';
import type { HttpContext } from '@adonisjs/core/http';

import User from '#auth/models/user';
import { ToastType } from '#core/enums/toast';
import ResetPasswordToken from '#auth/models/reset_password_tokens';

export default class ResetPasswordController {
  static validator = vine.create({
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    token: vine.string().trim(),
  });

  async render({ response, request }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL');
    }

    const token = request.param('token');

    ResetPasswordToken.query()
      .where('expires_at', '>', DateTime.now().toSQL())
      .where('token', token)
      .firstOrFail();

    return response.redirect().withQs({ modal: 'reset-password', token: token }).back();
  }

  async handle({ request, response, session }: HttpContext) {
    const { password, token } = await request.validateUsing(ResetPasswordController.validator);

    const user = await User.query()
      .whereHas('resetPasswordTokens', (query) => {
        query.where('token', token);
      })
      .firstOrFail();

    user.merge({ password });
    await user.save();

    session.flash('toasts', {
      type: ToastType.SUCCESS,
      message:
        'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
    });

    return response.redirect().back();
  }
}
