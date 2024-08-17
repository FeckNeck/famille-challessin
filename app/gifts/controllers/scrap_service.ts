import { Browser, chromium, Page } from 'playwright'

export default class ScrapService {
  private browser: Browser | undefined
  private page!: Page

  constructor() {
    this.init()
  }

  async init() {
    this.browser = await chromium.launch({ headless: true })
    this.page = await this.browser.newPage()
  }

  getBrowser() {
    return this.browser
  }

  // async scrap(url: string) {
  //   await this.page.goto(url, { waitUntil: 'domcontentloaded' })

  //   const title = await this.page.$eval('#productTitle', (el) => el.textContent.trim())
  //   const price = await this.page.$eval('.a-price .a-offscreen', (el) => el.textContent.trim())
  //   const description = await this.page.$eval('#feature-bullets ul', (el) => el.innerText.trim())
  //   const imageUrl = await this.page.$eval('#imgTagWrapperId img', (el) => el.src)

  //   return { title, price, description, imageUrl }
  // }

  async close() {
    await this.browser.close()
  }
}
