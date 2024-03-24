import User from '#models/user'
import Wishlist from '#models/wishlist'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class HomeController {
  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const { username, title } = request.qs()

    const users = await User.query().select('username')
    const wishlistsQuery = Wishlist.query()

    if (title) {
      wishlistsQuery.where('title', 'LIKE', `%${title}%`)
    }

    if (username) {
      wishlistsQuery.preload('user').whereHas('user', (builder) => {
        builder.where('username', 'LIKE', `%${username}%`)
      })
    }

    const wishlists = await wishlistsQuery.paginate(page, limit)
    const usernames = users.map((user) => user.username)
    const { data, meta } = wishlists.toJSON()

    return inertia.render('home/main', {
      meta,
      usernames,
      wishlists: data,
    })
  }
}
