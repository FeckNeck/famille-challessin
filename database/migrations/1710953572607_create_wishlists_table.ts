import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected wishlistsTableName = 'wishlists'
  protected wishlistThemestableName = 'wishlist_themes'
  protected wishlistCategoriesTableName = 'wishlist_categories'

  async up() {
    this.schema.createTable(this.wishlistThemestableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.string('name').notNullable().unique()
    })

    this.schema.createTable(this.wishlistsTableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.date('event_date')
      table.uuid('user_id').unsigned().references('id').inTable('users').notNullable()
      table
        .smallint('theme_id')
        .unsigned()
        .references('id')
        .inTable('wishlist_themes')
        .defaultTo(WishlistThemes.Other)
      table.text('title')
      table.text('description')
      table.boolean('is_public').notNullable().defaultTo(false)
      table.text('image')
    })

    this.schema.createTable(this.wishlistCategoriesTableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()
      table.uuid('wishlist_id').unsigned().references('id').inTable('wishlists').notNullable()
      table.text('name').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.wishlistCategoriesTableName)
    this.schema.dropTable(this.wishlistsTableName)
    this.schema.dropTable(this.wishlistThemestableName)
  }
}
