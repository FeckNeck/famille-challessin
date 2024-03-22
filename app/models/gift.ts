import { DateTime } from 'luxon'
import Wishlist from '#models/wishlist'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Gift extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare wishlistId: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare price: number

  @column()
  declare url: string

  @column()
  declare imageUrl: string

  @column()
  declare isReserved: boolean

  @column()
  declare giverId: number | null

  @column()
  declare giverName: string

  @column()
  declare giverEmail: string | null

  @belongsTo(() => Wishlist)
  declare wishlist: BelongsTo<typeof Wishlist>

  @belongsTo(() => User, {
    foreignKey: 'giverId',
  })
  declare giver: BelongsTo<typeof User>
}
