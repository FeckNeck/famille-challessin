import FirecrawlApp from '@mendable/firecrawl-js'
import { z } from 'zod'
import env from '#start/env'
import type User from '#auth/models/user'
import type { GiftScrapingResult } from '#wishlists/types/gifts'

export class CreateGiftsService {
  async scrap(url: string) {
    const app = new FirecrawlApp({
      apiKey: env.get('FC_API_KEY'),
    })

    const schema = z.object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string(),
      price: z.string(),
      url: z.string(),
    })

    return await app.scrapeUrl(url, {
      formats: ['extract'],
      extract: { schema },
    })
  }

  async create(
    gift: GiftScrapingResult | undefined,
    user: User | undefined,
    wishlistId: string,
    categoryId: string
  ) {
    const wishlist = await user
      ?.related('wishlists')
      .query()
      .preload('wishlistCategory')
      .where('id', wishlistId)
      .firstOrFail()

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', categoryId)
      .firstOrFail()

    await wishlistCategory?.related('gifts').create({
      title: gift?.title ?? null,
      description: gift?.description ?? null,
      image: gift?.imageUrl ?? null,
      price: gift?.price ?? null,
      url: gift?.url ?? null,
    })
  }
}
