import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'gifts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.uuid('wishlist_id').unsigned().references('id').inTable('wishlists').notNullable()
      table.text('title').notNullable()
      table.text('description')
      table.float('price').notNullable()
      table.text('url').notNullable()
      table.text('image_url').notNullable()
      table.boolean('is_reserved').notNullable().defaultTo(false)
      table.uuid('giver_id').unsigned().references('id').inTable('users').nullable()
      table.text('giver_name').notNullable().defaultTo('Anonyme')
      table.text('giver_email').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
