import factory from '@adonisjs/lucid/factories'
import User from '#auth/models/user'
import { UserRole } from '#auth/enums/user_role'
import { WishlistFactory } from '#database/factories/wishlist_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: 'Pizza1234*',
      icon: faker.image.avatar(),
      roleId: UserRole.User,
      color: faker.color.human(),
    }
  })
  .relation('wishlists', () => WishlistFactory)
  .build()
