import factory from '@adonisjs/lucid/factories'
import User from '#auth/models/user'
import { UserRole } from '#auth/enums/user_role'
import { WishlistFactory } from '#database/factories/wishlist_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pizza1234*',
      roleId: UserRole.User,
      color: faker.internet.color(),
    }
  })
  .relation('wishlists', () => WishlistFactory)
  .build()
