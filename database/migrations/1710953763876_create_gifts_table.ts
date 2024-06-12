import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected giftstableName = 'gifts'

  async up() {
    this.schema.createTable(this.giftstableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table
        .uuid('category_id')
        .unsigned()
        .references('id')
        .inTable('wishlist_categories')
        .notNullable()
      table.text('title').notNullable()
      table.text('description')
      table.float('price').notNullable()
      table.text('link').notNullable()
      table.text('image_url').notNullable()
      table.boolean('is_reserved').notNullable().defaultTo(false)
      table.uuid('giver_id').unsigned().references('id').inTable('users').nullable()
      table.text('giver_name').notNullable().nullable()
      table.text('giver_email').nullable().nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.giftstableName)
  }
}
