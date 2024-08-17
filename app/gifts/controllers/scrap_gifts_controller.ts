import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import { Browser, chromium, Page } from 'playwright'

export default class ScrapGiftsController {
  private browser!: Browser
  private page!: Page

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

  constructor() {
    ;async () => {
      this.browser = await chromium.launch({ headless: true })
      this.page = await this.browser.newPage()
    }
  }

  async handle({ request, response }: HttpContext) {
    const { url } = await request.validateUsing(ScrapGiftsController.scrapGiftsValidator)
    const browser = await chromium.launch({ headless: true })

    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const h1 = page.getByRole('heading')
    console.log(await h1.allInnerTexts())
    const title = await page.$eval('#productTitle', (el) => el.textContent.trim())
    const price = await page.$eval('.a-price .a-offscreen', (el) => el.textContent.trim())
    const description = await page.$eval('#feature-bullets ul', (el) => el.innerText.trim())
    const imageUrl = await page.$eval('#imgTagWrapperId img', (el) => el.src)

    // console.log('Title:', title)
    // console.log('Price:', price)
    // console.log('Description:', description)
    // console.log('Image URL:', imageUrl)

    await browser.close()
  }
}
