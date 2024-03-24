import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Wishlist from '#models/wishlist'
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

  @hasMany(() => Wishlist)
  declare wishlists: HasMany<typeof Wishlist>
}
