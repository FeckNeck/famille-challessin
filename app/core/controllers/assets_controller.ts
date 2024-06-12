import type { HttpContext } from '@adonisjs/core/http'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'

export default class AssetsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

    const filePath = request.param('*').join(sep)
    const normalizedPath = normalize(filePath)
    console.log('normalizedPath:', normalizedPath)

    if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
      return response.badRequest('Malformed path')
    }

    const absolutePath = app.makePath('uploads', normalizedPath)
    console.log('absolutePath:', absolutePath)
    return response.download(absolutePath)
  }
}
