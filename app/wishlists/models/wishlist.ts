import { DateTime } from 'luxon'
import User from '#auth/models/user'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WishlistCategory from '#wishlists/models/wishlist_category'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'

export default class Wishlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare eventDate: DateTime | null

  @column()
  declare userId: string

  @column()
  declare themeId: WishlistThemes

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column()
  declare isPublic: boolean

  @column()
  declare imageUrl: string | null

  @computed()
  get image() {
    if (!this.imageUrl) {
      return null
    }

    if (this.imageUrl?.startsWith('https://')) {
      return this.imageUrl
    }

    return `/img/${this.imageUrl}`
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => WishlistTheme, {
    foreignKey: 'themeId',
    serializeAs: 'theme',
  })
  declare wishlistTheme: BelongsTo<typeof WishlistTheme>

  @hasMany(() => WishlistCategory, {
    serializeAs: 'categories',
  })
  declare wishlistCategory: HasMany<typeof WishlistCategory>

  serializeExtras = true
}
