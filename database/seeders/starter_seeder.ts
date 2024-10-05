import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { UserFactory } from '#database/factories/user_factory'
import { UserRole } from '#auth/enums/user_role'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import WishlistTheme from '#wishlists/models/wishlist_theme'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()

    try {
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

  async seedWishtlistThemes(trx: TransactionClientContract) {
    await WishlistTheme.createMany(
      [
        {
          id: WishlistThemes.Christmas,
          name: 'Noël',
          icon: 'lucide:candy-cane',
          iconColor: '#FF0000',
        },
        {
          id: WishlistThemes.Birthday,
          name: 'Anniversaire',
          icon: 'lucide:cake',
          iconColor: '#FFA500',
        },
        { id: WishlistThemes.Other, name: 'Autre', icon: 'lucide:tree-palm', iconColor: '#FFA500' },
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
      .createMany(5)

    await UserFactory.client(trx)
      .merge({
        email: 'mathis.dousse@example.com',
        username: 'Mathis Dousse',
        roleId: UserRole.Admin,
      })
      .create()
  }
}
