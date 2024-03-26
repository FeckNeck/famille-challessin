import User from '#models/user'
import Wishlist from '#models/wishlist'
import WishlistTheme from '#models/wishlist_theme'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 9

    const { username, title, theme } = request.qs()

    const users = await User.query()
      .select('id', 'username')
      .withCount('wishlists', (builder) => builder.as('count'))

    const themes = await WishlistTheme.query().withCount('wishlists', (builder) =>
      builder.as('count')
    )
    const query = Wishlist.query().where('is_public', true)

    if (title) {
      query.where('title', 'LIKE', `%${title}%`)
    }

    if (theme) {
      await query.whereHas('wishlistTheme', (builder) => {
        builder.where('name', theme)
      })
    }

    if (username) {
      await query.whereHas('user', (builder) => {
        builder.where('username', username)
      })
    }

    const wishlists = await query.paginate(page, limit)
    const { data, meta } = wishlists.toJSON()
    return inertia.render('home/main', {
      meta,
      users,
      wishlists: data,
      themes,
    })
  }
}
