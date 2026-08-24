import { Firecrawl, ProductProfile } from 'firecrawl';
import User from '#auth/models/user';
import env from '#start/env';

export class createGiftsService {
  async scrap(url: string) {
    const app = new Firecrawl({
      apiKey: env.get('FC_API_KEY'),
    });

    return await app.scrape(url, {
      formats: ['product'],
      maxAge: 3600000,
    });
  }

  async create(
    gift: ProductProfile | undefined,
    user: User,
    wishlistId: string,
    categoryId: string,
  ) {
    const wishlist = await user
      .related('wishlists')
      .query()
      .preload('wishlistCategory')
      .where('id', wishlistId)
      .firstOrFail();

    const wishlistCategory = await wishlist
      .related('wishlistCategory')
      .query()
      .where('id', categoryId)
      .firstOrFail();

    await wishlistCategory.related('gifts').create({
      title: gift?.title ?? null,
      description: gift?.description ?? null,
      image: gift?.variants?.[0]?.images?.[0]?.url ?? null,
      price: gift?.variants?.[0]?.price?.formatted ?? null,
      url: gift?.url ?? null,
    });
  }
}
