import factory from '@adonisjs/lucid/factories'
import Gift from '#wishlists/models/gift'

export const GiftFactory = factory
  .define(Gift, async ({ faker }) => {
    return {
      title: faker.lorem.words(10),
      description: faker.lorem.paragraph(),
      price: faker.number.float().toString(),
      link: faker.internet.url(),
      image: faker.image.url(),
      isReserved: faker.datatype.boolean(),
      giverName: faker.internet.userName(),
      giverEmail: faker.internet.email(),
    }
  })
  .build()
