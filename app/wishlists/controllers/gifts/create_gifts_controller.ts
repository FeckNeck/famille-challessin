import vine from '@vinejs/vine';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { ToastType } from '#core/enums/toast';
import { createGiftsService } from '#wishlists/services/gifts/create_gift_service';

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

  async handle({ response, params, auth, request, session }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator);

    let gift = undefined;

    if (url) {
      const scrapeResult = await this.createGiftsService.scrap(url);

      if (scrapeResult.metadata?.error || !scrapeResult.product) {
        session.flash('toast', {
          type: ToastType.ERROR,
          message: "Impossible de récupérer les informations du cadeau depuis l'URL fournie.",
        });
      }

      gift = scrapeResult.product;
    }

    await this.createGiftsService.create(gift, auth.user!, params.id, params.categoryId);

    return response.redirect().back();
  }
}
