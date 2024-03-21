import { DateTime } from 'luxon'
import WishList from '#models/wish_list'
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
  declare wishListId: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare image: string | null

  @column()
  declare isReserved: boolean

  @column()
  declare giverId: number | null

  @column()
  declare giverName: string

  @column()
  declare giverEmail: string | null

  @belongsTo(() => WishList)
  declare wishList: BelongsTo<typeof WishList>

  @belongsTo(() => User, {
    foreignKey: 'giverId',
  })
  declare giver: BelongsTo<typeof User>
}
