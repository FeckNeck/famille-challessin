import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import Role from '#auth/models/role'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { Roles } from '#auth/enums/roles'
import Wishlist from '#wishlists/models/wishlist'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare roleId: Roles

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare icon: string | null

  @column()
  declare iconColor: string | null

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Wishlist)
  declare wishlists: HasMany<typeof Wishlist>

  serializeExtras() {
    return {
      count: this.$extras.count,
    }
  }
}
