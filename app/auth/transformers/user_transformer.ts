import { BaseTransformer } from '@adonisjs/core/transformers'
import User from '#auth/models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'username', 'email', 'icon', 'color', 'roleId'])
  }
}
