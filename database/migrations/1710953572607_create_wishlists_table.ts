import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wishlists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.timestamp('event_date', { useTz: false })
      table.uuid('user_id').unsigned().references('id').inTable('users').notNullable()
      table.text('title').notNullable()
      table.text('description')
      table.boolean('is_public').notNullable().defaultTo(false)
      table.text('image_url').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
