import { Roles } from '#auth/enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected usersTableName = 'users'
  protected RolestableName = 'roles'

  async up() {
    this.schema.createTable(this.RolestableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.text('name').notNullable().unique()
    })

    this.schema.createTable(this.usersTableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.smallint('role_id').unsigned().references('id').inTable('roles').defaultTo(Roles.User)
      table.text('username').notNullable().unique()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
      table.text('icon').nullable()
      table.text('icon_color').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.usersTableName)
    this.schema.dropTable(this.RolestableName)
  }
}
