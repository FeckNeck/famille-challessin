import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'wishlists';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('slug').unique().nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
