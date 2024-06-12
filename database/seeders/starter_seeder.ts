import { Roles } from '#auth/enums/roles'
import Role from '#auth/models/role'
import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import app from '@adonisjs/core/services/app'
import { UserFactory } from '#database/factories/user_factory'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()

    try {
      await this.seedRoles(trx)
      await this.seedWishtlistThemes(trx)

      if (!app.inTest && !app.inProduction) {
        await this.seedUsersAndContent(trx)
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      console.log({ error })
    }
  }

  async seedRoles(trx: TransactionClientContract) {
    await Role.createMany(
      [
        { id: Roles.User, name: 'User' },
        { id: Roles.Admin, name: 'Admin' },
      ],
      { client: trx }
    )
  }

  async seedWishtlistThemes(trx: TransactionClientContract) {
    await WishlistTheme.createMany(
      [
        { id: WishlistThemes.Christmas, name: 'Christmas' },
        { id: WishlistThemes.Birthday, name: 'Birthday' },
        { id: WishlistThemes.Other, name: 'Other' },
      ],
      { client: trx }
    )
  }

  async seedUsersAndContent(trx: TransactionClientContract) {
    await UserFactory.client(trx)
      .with('wishlists', 10, (wishlist) =>
        wishlist.with('wishlistCategory', 10, (wishlistCategory) =>
          wishlistCategory.with('gifts', 10)
        )
      )
      .createMany(10)
  }
}
