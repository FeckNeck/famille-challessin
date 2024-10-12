import { DateTime } from 'luxon'
import User from '#auth/models/user'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import WishlistCategory from '#wishlists/models/wishlist_category'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import router from '@adonisjs/core/services/router'
import env from '#start/env'

export default class Wishlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.date()
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
  declare image: string | null

  @computed()
  get imageUrl() {
    if (!this.image) {
      return null
    }

    if (this.image?.startsWith('https://')) {
      return this.image
    }

    return `/img/${this.image}`
  }

  @computed()
  get url() {
    if (!this.isPublic) return null

    return router
      .builder()
      .prefixUrl(env.get('DOMAIN'))
      .params({ id: this.id })
      .makeSigned('wishlists.show')
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
