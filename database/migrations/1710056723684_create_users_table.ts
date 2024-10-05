import { UserRole } from '#auth/enums/user_role'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected usersTableName = 'users'
  protected rememberMeTableName = 'remember_me_tokens'
  protected resetPasswordTableName = 'reset_password_tokens'

  async up() {
    this.schema.createTable(this.usersTableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.smallint('role_id').defaultTo(UserRole.User).notNullable()
      table.text('username').notNullable().unique()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
      table.text('icon').nullable()
      table.text('icon_color').nullable()
    })

    this.schema.createTable(this.rememberMeTableName, (table) => {
      table.increments()
      table
        .uuid('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('hash').notNullable().unique()
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.timestamp('expires_at', { useTz: false }).notNullable()
    })

    this.schema.createTable(this.resetPasswordTableName, (table) => {
      table.increments()
      table
        .uuid('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('token').notNullable().unique()
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.timestamp('expires_at', { useTz: false }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.usersTableName)
    this.schema.dropTable(this.rememberMeTableName)
    this.schema.dropTable(this.resetPasswordTableName)
  }
}
