import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wishlist_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.uuid('wishlist_id').unsigned().references('id').inTable('wishlists').notNullable()
      table.text('name').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
