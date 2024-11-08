import { afterFetch, afterFind, BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import drive from '@adonisjs/drive/services/main'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#auth/models/user'
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
  declare url: string | null

  @column()
  declare image: string | null

  @column()
  declare giverId: string | null

  @column()
  declare giverName: string | null

  @column()
  declare giverEmail: string | null

  @computed()
  declare imageUrl: string | null

  @afterFetch()
  static async fetchImageUrl(gifts: Gift[]) {
    for (const gift of gifts) {
      if (!gift.image) continue

      if (gift.image.startsWith('https://')) {
        gift.imageUrl = gift.image
      } else {
        gift.imageUrl = await drive.use('s3').getUrl(gift.image)
      }
    }
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
