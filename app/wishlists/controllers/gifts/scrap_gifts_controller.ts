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
        console.log('elements:', elements)
        elements.forEach((element) => element.remove())
      })

      /**
       * Get the title of the product
       */
      let productTitle = null

      try {
        // Essayer de récupérer le titre à partir des sélecteurs fournis
        productTitle = await page
          .locator('h1.title, h1.product-title, h1.product_title, h1#product-title, h1#title')
          .first()
          .textContent({ timeout: 1000 })
        console.log('1 productTitle:', productTitle)
      } catch (e) {
        console.log('error:', e)
      }

      // Si "Essai gratuit Prime" est trouvé, chercher un autre h1 sans ce texte
      try {
        if (!productTitle || productTitle.includes('Essai gratuit Prime')) {
          console.log('Essai gratuit Prime')
          productTitle = await page.locator('h1').first().textContent({ timeout: 1000 })
          console.log('2 productTitle:', productTitle)
        }
      } catch (e) {
        console.log('error:', e)
      }

      if (productTitle) {
        title = productTitle
        //   .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]/g, '')
        //   .replace(/\s+/g, ' ')
        //   .trim()
        // console.log('title:', title)
      }

      /**
       * Get the image of the product
       */
      let productImage = null

      try {
        // Essayer de récupérer l'image à partir des sélecteurs fournis
        productImage = page
          .locator(
            'img.product_image, img.product-image, img.product-img, img.product_img, img#product-image, img.landingImage, img#landingImage'
          )
          .first()
        console.log('productImage 1: ', await productImage.all())
      } catch (e) {
        console.log('error:', e)
      }
      // Si aucun résultat trouvé, utiliser le titre pour rechercher une image correspondante
      try {
        if ((!productImage || !(await productImage.count())) && title !== null) {
          const slug = title.split(' ').slice(0, 2).join(' ')
          console.log('slug:', slug)
          productImage = page
            .locator(
              `//img[not(contains(@src, 'data:image')) and (contains(@title, "${slug}") or contains(@alt, "${slug}") or contains(@srcset, "${slug}") or contains(@src, "${slug}"))]`
            )
            .first()
        }
      } catch (e) {
        console.log('error:', e)
      }

      // Si une image est trouvée, obtenir l'URL de l'image
      if (productImage && (await productImage.count())) {
        imageUrl =
          (await productImage.getAttribute('src')) ||
          (await productImage
            .getAttribute('srcset')
            .then((srcset) => srcset?.split(' ')[0] ?? null))
        console.log('imageUrl:', imageUrl)
      }

      /**
       * Get the price of the product
       */
      let productPrice = page
        .locator('.product_price, .product-price, .price, .price-value, #product-price, #price')
        .first()
      if (!(await productPrice.count())) {
        const priceSelector = `//span[contains(text(), "€") or contains(text(), "$") or contains(text(), "£")]`
        productPrice = page.locator(priceSelector).first()
      }
      if (await productPrice.count()) {
        priceText = await productPrice.textContent()
        console.log('priceText:', priceText)
        if (priceText) {
          priceText = priceText
            .replace(/[^0-9,]/g, '') // Supprimer tout sauf chiffres et virgules
            .replace(',', '.') // Remplacer les virgules par des points
            .trim()
          console.log('priceText:', priceText)
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
      url: url,
    })

    return response.redirect().back()
  }
}
