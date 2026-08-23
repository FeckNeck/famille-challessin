import { sep, normalize } from 'node:path';
import app from '@adonisjs/core/services/app';
import type { HttpContext } from '@adonisjs/core/http';

export default class ShowMediaController {
  /**
   * Display a list of resource
   */
  async render({ request, response }: HttpContext) {
    const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

    const filePath = request.param('*').join(sep);
    const normalizedPath = normalize(filePath);

    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest('Malformed path');
    }

    const absolutePath = app.makePath('public/uploads', normalizedPath);
    return response.download(absolutePath);
  }
}
