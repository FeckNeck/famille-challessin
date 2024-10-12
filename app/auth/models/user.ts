import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { IUserRole } from '#auth/enums/user_role'
import Wishlist from '#wishlists/models/wishlist'
import ResetPasswordToken from './reset_password_tokens.js'

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
  declare roleId: IUserRole

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare icon: string | null

  @column()
  declare color: string | null

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @hasMany(() => Wishlist)
  declare wishlists: HasMany<typeof Wishlist>

  @hasMany(() => ResetPasswordToken)
  declare resetPasswordTokens: HasMany<typeof ResetPasswordToken>

  serializeExtras() {
    return {
      count: this.$extras.count,
    }
  }
}
