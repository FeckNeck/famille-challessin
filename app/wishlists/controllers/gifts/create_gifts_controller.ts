import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
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

  constructor(private createGiftsService: CreateGiftsService) {}

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
