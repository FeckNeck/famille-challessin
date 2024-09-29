import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'
import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

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

  async handle({ response, params, auth, request }: HttpContext) {
    const { url } = await request.validateUsing(ScrapGiftsController.scrapGiftsValidator)

    let title: string | null = null
    let imageUrl: string | null = null
    let priceText: string | null = null

    /**
     * Scrap the product page
     */
    chromium.use(StealthPlugin())
    try {
      const browser = await chromium.launch({ headless: true })
      const page = await browser.newPage()
      await page.goto(url)

      /**
       * Remove popups
       */
      const elementsToRemove = page.locator(`
        [id*="popover"], [class*="popover"],
        [id*="cookies"], [class*="cookies"],
        [id*="privacy"], [class*="privacy"],
        [id*="modal"], [class*="modal"]
      `)
      await elementsToRemove.evaluateAll((elements) => {
        elements.forEach((element) => element.remove())
      })

      /**
       * Get the title of the product
       */
      const rawTtitle = await page
        .locator('h1')
        .filter({ hasNotText: 'Essai gratuit Prime' })
        .first()
        .textContent()
      console.log('rawTtitle:', rawTtitle)
      title = rawTtitle
        ? rawTtitle
            .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
        : null
      console.log('title:', title)

      const slug = title?.split(' ')[0]
      console.log('slug:', slug)

      /**
       * Get the image of the product
       */
      let productImage = page
        .locator('.product_image, .product-image, .product-img, .product_img, #product-image')
        .first()
      if (!(await productImage.count())) {
        const imageSelector = `//img[not(contains(@src, 'data:image')) and (contains(@title, "${slug}") or contains(@alt, "${slug}") or contains(@src, "${slug?.toLowerCase()}"))]`
        productImage = page.locator(imageSelector).first()
      }
      if (await productImage.count()) {
        imageUrl = await productImage.getAttribute('src')
        if (!imageUrl) {
          imageUrl = await productImage
            .getAttribute('srcset')
            .then((srcset) => srcset?.split(' ')[0]! ?? null)
        }
        console.log('imageUrl:', imageUrl)
      }

      /**
       * Get the price of the product
       */
      let productPrice = page
        .locator('.product_price, .product-price, .price, #product-price, #price')
        .first()
      if (!(await productPrice.count())) {
        const priceSelector = `//span[contains(text(), "€") or contains(text(), "$") or contains(text(), "£")]`
        productPrice = page.locator(priceSelector).first()
      }
      if (await productPrice.count()) {
        priceText = await productPrice.textContent()
        if (priceText) {
          priceText = priceText
            .replace(/[^0-9.,]/g, '') // Supprimer tout sauf chiffres et virgules
            .replace(',', '.') // Remplacer les virgules par des points
            .trim()
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }

    /**
     * Save the gift to the database
     */
    const wishlist = await auth.user
      ?.related('wishlists')
      .query()
      .preload('wishlistCategory')
      .where('id', params.id)
      .firstOrFail()

    const wishlistCategory = await wishlist
      ?.related('wishlistCategory')
      .query()
      .where('id', params.categoryId)
      .firstOrFail()

    await wishlistCategory?.related('gifts').create({
      title: title ?? null,
      image: imageUrl ?? null,
      price: priceText ?? null,
      link: url,
    })

    return response.redirect().toRoute('wishlists.edit', { id: wishlist!.id })
  }
}
