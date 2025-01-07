import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Gift from '#wishlists/models/gift'
import Wishlist from './wishlist.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'

export default class WishlistCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare wishlistId: string

  @column()
  declare name: string | null

  @hasMany(() => Gift, {
    foreignKey: 'categoryId',
  })
  declare gifts: HasMany<typeof Gift>

  @belongsTo(() => Wishlist)
  declare wishlist: BelongsTo<typeof Wishlist>
}
