import Roles from '#enums/roles'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      { id: Roles.USER, name: 'User' },
      { id: Roles.ADMIN, name: 'Admin' },
    ])
  }
}
