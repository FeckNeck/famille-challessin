import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Gift from '#gifts/models/gift'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Wishlist from './wishlist.js'

export default class WishlistCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare wishlistId: number

  @column()
  declare name: string

  @hasMany(() => Gift, {
    foreignKey: 'categoryId',
  })
  declare gifts: HasMany<typeof Gift>

  @belongsTo(() => Wishlist)
  declare wishlist: BelongsTo<typeof Wishlist>
}
