import vine from '@vinejs/vine'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { HttpContext } from '@adonisjs/core/http'

export default class ScrapGiftsController {
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

  async handle({ request, response }: HttpContext) {
    const { url } = await request.validateUsing(ScrapGiftsController.scrapGiftsValidator)

    // Scrap the gift details from the URL
    // const model = new ChatOpenAI({
    //   model: 'gpt-4o-mini',
    //   temperature: 0,
    // })

    // const gift = z.object({
    //   title: z.string().describe('The title of the gift'),
    //   description: z.string().describe('The description of the gift'),
    //   price: z.number().describe('The price of the gift'),
    //   url: z.string().describe('The URL of the gift'),
    //   image: z.string().describe('The image of the gift'),
    // })

    // const structuredLlm = model.withStructuredOutput(gift)

    // await structuredLlm.invoke('
  }
}
