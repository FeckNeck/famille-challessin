import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class ResetPasswordToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare userId: string

  @column()
  declare token: string

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static async setExpiresAt(resetPasswordToken: ResetPasswordToken) {
    resetPasswordToken.expiresAt = DateTime.now().plus({ hour: 1 })
  }
}
