import factory from '@adonisjs/lucid/factories'
import User from '#auth/models/user'
import { Roles } from '#auth/enums/roles'
import { WishlistFactory } from '#database/factories/wishlist_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pizza1234*',
      roleId: Roles.User,
    }
  })
  .relation('wishlists', () => WishlistFactory)
  .build()
