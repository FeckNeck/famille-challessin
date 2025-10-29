import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import WishlistCategoryRepository from '#wishlists/repositories/wishlist_category_repository'
import { CreateGiftsService } from '#wishlists/services/gifts/create_gift_service'
import { GiftScrapedInfo } from '#wishlists/types/gift_scraped_info'
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

  async handle({ response, bouncer, request }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator)
    const { id: wishlistId, categoryId } = request.params()

    const wishlistCategory = await this.wishlistCategoryRepository.findOneByWishlistId(
      wishlistId,
      categoryId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', wishlistCategory.wishlist)

    const wishlistResult = await this.createGiftsService.scrap(url)
    const wishlist = wishlistResult.json as GiftScrapedInfo
    wishlist.url = url

    await this.createGiftsService.create(wishlistCategory, wishlist)

    return response.redirect().back()
  }
}
