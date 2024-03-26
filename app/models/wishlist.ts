import { DateTime } from 'luxon'
import Gift from '#models/gift'
import User from '#models/user'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WishlistTheme from '#models/wishlist_theme'

export default class Wishlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare eventDate: DateTime | null

  @column()
  declare userId: number

  @column()
  declare themeId: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare isPublic: boolean

  @column()
  declare imageUrl: string

  @computed()
  get image() {
    if (this.imageUrl.startsWith('https://')) {
      return this.imageUrl
    }

    return `/img/${this.imageUrl}`
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => WishlistTheme, {
    foreignKey: 'themeId',
  })
  declare wishlistTheme: BelongsTo<typeof WishlistTheme>

  @hasMany(() => Gift)
  declare gifts: HasMany<typeof Gift>

  serializeExtras = true
}
