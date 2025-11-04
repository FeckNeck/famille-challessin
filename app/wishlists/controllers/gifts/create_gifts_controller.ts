import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import { ToastType } from '#core/enums/toast'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import WishlistCategoryRepository from '#wishlists/repositories/wishlist_category_repository'
import { CreateGiftsService } from '#wishlists/services/gifts/create_gift_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CreateGiftsController {
  static scrapGiftsValidator = vine.compile(
    vine.object({
      url: vine
        .string()
        .trim()
        .url({
          require_protocol: true,
          protocols: ['http', 'https'],
        }),
    })
  )

  constructor(
    private wishlistCategoryRepository: WishlistCategoryRepository,
    private createGiftsService: CreateGiftsService
  ) {}

  async handle({ response, bouncer, request, session }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator)
    const { id: wishlistId, categoryId } = request.params()

    const wishlistCategory = await this.wishlistCategoryRepository.findOneByWishlistId(
      wishlistId,
      categoryId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', wishlistCategory.wishlist)

    const wishlist = await this.createGiftsService.scrap(url)

    if (!wishlist.title) {
      wishlist.title = 'Une erreur est survenue lors de la récupération du cadeau'
      session.flash('toast', {
        type: ToastType.ERROR,
        message: "Impossible de récupérer les informations du cadeau depuis l'URL fournie.",
      })
    }

    await this.createGiftsService.create(wishlistCategory, wishlist)

    return response.redirect().back()
  }
}
