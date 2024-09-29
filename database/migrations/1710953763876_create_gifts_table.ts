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
        .onDelete('CASCADE')
        .notNullable()
      table.text('title')
      table.text('description')
      table.text('price')
      table.text('link')
      table.text('image')
      table.boolean('is_reserved').defaultTo(false)
      table.uuid('giver_id').unsigned().references('id').inTable('users')
      table.text('giver_name')
      table.text('giver_email')
    })
  }

  async down() {
    this.schema.dropTable(this.giftstableName)
  }
}
