import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(1)
      table.text('username').notNullable().unique()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
