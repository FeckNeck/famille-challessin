import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async destroy({ auth, inertia }: HttpContext) {
    await auth.use('web').logout()
    return inertia.location('/')
  }
}
