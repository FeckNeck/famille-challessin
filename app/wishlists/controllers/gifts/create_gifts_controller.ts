import type { HttpContext } from '@adonisjs/core/http'
import type { createGiftsService } from '#wishlists/services/gifts/create_gift_service'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'

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

  constructor(private createGiftsService: createGiftsService) {}

  async handle({ response, params, auth, request }: HttpContext) {
    const { url } = await request.validateUsing(CreateGiftsController.scrapGiftsValidator)

    const scrapeResult = await this.createGiftsService.scrap(url)

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`)
    }

    await this.createGiftsService.create(scrapeResult, auth.user, params.id, params.categoryId)

    return response.redirect().back()
  }
}
