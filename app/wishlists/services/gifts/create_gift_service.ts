import FirecrawlApp from '@mendable/firecrawl-js'
import env from '#start/env'
import type WishlistCategory from '#wishlists/models/wishlist_category'
import type { GiftScrapedInfo } from '#wishlists/types/gift_scraped_info'

export class CreateGiftsService {
  async scrap(url: string) {
    const firecrawl = new FirecrawlApp({
      apiKey: env.get('FC_API_KEY'),
    })

    /*
     ** Doesnt work as expected for now, better to use the prompt
     */
    // const wishlistSchema = z.object({
    //   product_title: z.string(),
    //   product_description: z.string(),
    //   product_image_url: z.string(),
    //   product_price: z.string(),
    //   product_url: z.string(),
    // })

    return await firecrawl.scrape(url, {
      formats: [
        {
          type: 'json',
          prompt:
            'Extract the following product informations : title, description, imageUrl and price.',
        },
      ],
    })
  }

  async create(wishlistCategory: WishlistCategory, wishlist: GiftScrapedInfo) {
    if (!wishlist.title) {
      wishlist.title = 'Une erreur est survenue lors de la récupération du cadeau'
    }

    await wishlistCategory.related('gifts').create({
      title: wishlist.title ?? null,
      description: wishlist.description ?? null,
      image: wishlist.imageUrl ?? null,
      price: wishlist.price ?? null,
      url: wishlist.url,
    })
  }
}
