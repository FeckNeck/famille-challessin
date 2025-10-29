import stringHelpers from '@adonisjs/core/helpers/string'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wishlists'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('slug').unique().nullable()
    })

    this.defer(async (db) => {
      const wishlists = await db
        .from(this.tableName)
        .select(['title', 'id'])
        .whereNull('slug')
        .andWhereNotNull('title')

      await Promise.all(
        wishlists.map((wishlist) => {
          return db
            .from(this.tableName)
            .where('id', wishlist.id)
            .update({
              slug: stringHelpers.slug(wishlist.title, {
                lower: true,
                trim: true,
                strict: true,
              }),
            })
        })
      )
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
