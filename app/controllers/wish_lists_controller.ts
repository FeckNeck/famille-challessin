import { assetStoreValidator } from '#validators/asset_validator'
import { wishlistValidator } from '#validators/wishlist_validator'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class WishListsController {
  /**
   * Display a list of resource
   */
  async index({ inertia, auth }: HttpContext) {
    const wishlists = await auth.user?.related('wishlists').query()
    return inertia.render('wishlist/main', { wishlists })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('wishlist/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(wishlistValidator)
    const { file } = await request.validateUsing(assetStoreValidator)
    if (file) {
      await file.move(app.makePath('uploads'), {
        name: `${cuid()}.${file.extname}`,
      })
      payload.imageUrl = file.fileName
    }
    await auth.user?.related('wishlists').create(payload)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
