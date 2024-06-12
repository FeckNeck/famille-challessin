import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#auth/models/role'
import { Roles } from '#auth/enums/roles'
import Wishlist from '#wishlists/models/wishlist'

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
  declare roleId: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @computed()
  get isAdmin() {
    return this.roleId === Roles.Admin
  }

  @hasMany(() => Wishlist)
  declare wishlists: HasMany<typeof Wishlist>

  serializeExtras() {
    return {
      count: this.$extras.count,
    }
  }
}
