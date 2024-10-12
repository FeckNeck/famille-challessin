import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class WishlistMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const isAuthenticated = await ctx.auth.check()
    if (isAuthenticated || ctx.request.hasValidSignature()) {
      return await next()
    }
    return ctx.response.redirect().toRoute('auth.login.render')
  }
}
