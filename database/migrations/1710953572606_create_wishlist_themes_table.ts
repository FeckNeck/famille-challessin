import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wishlist_themes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.string('name').notNullable().unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
