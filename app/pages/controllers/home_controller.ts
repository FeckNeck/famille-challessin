import type { HttpContext } from '@adonisjs/core/http'
import User from '#auth/models/user'
import Wishlist from '#wishlists/models/wishlist'
import WishlistTheme from '#wishlists/models/wishlist_theme'

export default class HomeController {
  async render({ request, inertia, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 9

    const { username, title, theme, order, orderBy } = request.qs()

    /**
     * Fetch users and their public wishlists count
     */
    const users = await User.query()
      .select('id', 'username', 'color', 'icon')
      .withCount('wishlists', (wishlists) =>
        wishlists
          .where((builder) => {
            builder.where('is_public', true)

            if (auth.user) {
              builder.orWhere('user_id', auth.user.id)
            }
          })
          .as('count')
      )

    /**
     * Fetch themes and their public wishlists count
     */
    const themes = await WishlistTheme.query().withCount('wishlists', (builder) =>
      builder.where('is_public', true).as('count')
    )

    /**
     * Fetch wishlists
     * Filter by title, theme and username
     */
    const query = Wishlist.query()
      .select('id', 'title', 'description', 'image', 'event_date', 'user_id', 'theme_id')
      .preload('wishlistTheme')
      .preload('user')
      .where((builder) => {
        builder.where('is_public', true)

        if (auth.user) {
          builder.orWhere('user_id', auth.user.id)
        }
      })

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

    if (orderBy && order) {
      query.orderBy(orderBy, order)
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
