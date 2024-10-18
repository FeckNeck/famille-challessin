import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { UserRole } from '#auth/enums/user_role'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    const trx = await db.transaction()

    try {
      await UserFactory.client(trx)
        .with('wishlists', 10, (wishlist) =>
          wishlist.with('wishlistCategory', 10, (wishlistCategory) =>
            wishlistCategory.with('gifts', 10)
          )
        )
        .createMany(5)

      await UserFactory.client(trx)
        .merge({
          email: 'mathis.dousse@example.com',
          username: 'Mathis Dousse',
          password: 'admin1234*',
          roleId: UserRole.Admin,
        })
        .create()
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.log({ error })
    }
  }
}
