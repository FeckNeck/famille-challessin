/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: {
      render: typeof routes['auth.login.render']
      handle: typeof routes['auth.login.handle']
    }
    forgotPassword: {
      render: typeof routes['auth.forgot_password.render']
      handle: typeof routes['auth.forgot_password.handle']
    }
    resetPassword: {
      render: typeof routes['auth.reset_password.render']
      handle: typeof routes['auth.reset_password.handle']
    }
    logout: typeof routes['auth.logout']
  }
  wishlists: {
    create: typeof routes['wishlists.create']
    show: typeof routes['wishlists.show']
    edit: typeof routes['wishlists.edit']
    store: typeof routes['wishlists.store']
    update: typeof routes['wishlists.update']
    categories: {
      delete: typeof routes['wishlists.categories.delete']
      store: typeof routes['wishlists.categories.store']
      update: typeof routes['wishlists.categories.update']
    }
  }
  gifts: {
    scrap: typeof routes['gifts.scrap']
    edit: typeof routes['gifts.edit']
    book: typeof routes['gifts.book']
    delete: typeof routes['gifts.delete']
  }
  home: typeof routes['home']
  media: {
    show: typeof routes['media.show']
  }
}
