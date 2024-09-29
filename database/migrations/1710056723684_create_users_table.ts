import { Roles } from '#auth/enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected usersTableName = 'users'
  protected RolestableName = 'roles'
  protected TokenTableName = 'remember_me_tokens'

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

    this.schema.createTable(this.TokenTableName, (table) => {
      table.increments()
      table
        .uuid('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('hash').notNullable().unique()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('expires_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.usersTableName)
    this.schema.dropTable(this.RolestableName)
    this.schema.dropTable(this.TokenTableName)
  }
}
