import { DateTime } from 'luxon'
import Gift from '#models/gift'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class WishList extends BaseModel {
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
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare isPublic: boolean

  @column()
  declare imageUrl: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Gift)
  declare gifts: HasMany<typeof Gift>
}
