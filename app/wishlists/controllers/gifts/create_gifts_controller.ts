import { inject } from '@adonisjs/core'
import FirecrawlApp from '@mendable/firecrawl-js'
import vine from '@vinejs/vine'
import { z } from 'zod'
import env from '#start/env'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import WishlistCategoryRepository from '#wishlists/repositories/wishlist_category_repository'
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

  static schema = z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    price: z.string(),
    url: z.string(),
  })

  constructor(protected wishlistCategoryRepository: WishlistCategoryRepository) {}

  async handle({ response, bouncer, request }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator)
    const { id: wishlistId, categoryId } = request.params()

    const wishlistCategory = await this.wishlistCategoryRepository.findOneByWishlistId(
      wishlistId,
      categoryId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', wishlistCategory.wishlist)

    const app = new FirecrawlApp({
      apiKey: env.get('FC_API_KEY'),
    })

    const scrapeResult = await app.scrapeUrl(url, {
      formats: ['extract'],
      extract: { schema: CreateGiftsController.schema },
    })

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`)
    }

    const { title, description, imageUrl, price } = scrapeResult.extract ?? {}

    await wishlistCategory.related('gifts').create({
      title: title ?? null,
      description: description ?? null,
      image: imageUrl ?? null,
      price: price ?? null,
      url,
    })

    return response.redirect().back()
  }
}
