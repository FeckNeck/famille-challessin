import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Wishlist from '#wishlists/models/wishlist'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class WishlistTheme extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @hasMany(() => Wishlist, {
    foreignKey: 'themeId',
  })
  declare wishlists: HasMany<typeof Wishlist>

  serializeExtras() {
    return {
      count: this.$extras.count,
    }
  }
}
