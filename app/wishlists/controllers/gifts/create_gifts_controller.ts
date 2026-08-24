import type { HttpContext } from '@adonisjs/core/http';
import { createGiftsService } from '#wishlists/services/gifts/create_gift_service';
import vine from '@vinejs/vine';
import { inject } from '@adonisjs/core';

@inject()
export default class CreateGiftsController {
  static scrapGiftsValidator = vine.create({
    url: vine
      .string()
      .trim()
      .url({
        require_protocol: true,
        protocols: ['http', 'https'],
      })
      .optional(),
  });

  constructor(protected createGiftsService: createGiftsService) {}

  async handle({ response, params, auth, request }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator);

    let gift = undefined;

    if (url) {
      const scrapeResult = await this.createGiftsService.scrap(url);

      if (scrapeResult.metadata?.error) {
        throw new Error(`Failed to scrape: ${scrapeResult.metadata.error}`);
      }

      gift = scrapeResult.product;
    }

    await this.createGiftsService.create(gift, auth.user!, params.id, params.categoryId);

    return response.redirect().back();
  }
}
