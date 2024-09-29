import { DateTime } from 'luxon'
import User from '#auth/models/user'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import WishlistCategory from '#wishlists/models/wishlist_category'

export default class Gift extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare categoryId: number

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column()
  declare price: string | null

  @column()
  declare link: string | null

  @column()
  declare image: string | null

  @column()
  declare isReserved: boolean

  @column()
  declare giverId: string | null

  @column()
  declare giverName: string | null

  @column()
  declare giverEmail: string | null

  @computed()
  get imageUrl() {
    if (this.image?.startsWith('https://')) {
      return this.image
    }

    return `/img/${this.image}`
  }

  @belongsTo(() => WishlistCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof WishlistCategory>

  @belongsTo(() => User, {
    foreignKey: 'giverId',
  })
  declare giver: BelongsTo<typeof User>
}
