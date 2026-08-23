/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'

import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login.render': {
    methods: ["GET","HEAD"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login.render']['types'],
  },
  'auth.login.handle': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login.handle']['types'],
  },
  'auth.forgot_password.render': {
    methods: ["GET","HEAD"],
    pattern: '/auth/forgot-password',
    tokens: [{"old":"/auth/forgot-password","type":0,"val":"auth","end":""},{"old":"/auth/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.forgot_password.render']['types'],
  },
  'auth.forgot_password.handle': {
    methods: ["POST"],
    pattern: '/auth/forgot-password',
    tokens: [{"old":"/auth/forgot-password","type":0,"val":"auth","end":""},{"old":"/auth/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['auth.forgot_password.handle']['types'],
  },
  'auth.reset_password.render': {
    methods: ["GET","HEAD"],
    pattern: '/auth/reset-password/:token',
    tokens: [{"old":"/auth/reset-password/:token","type":0,"val":"auth","end":""},{"old":"/auth/reset-password/:token","type":0,"val":"reset-password","end":""},{"old":"/auth/reset-password/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['auth.reset_password.render']['types'],
  },
  'auth.reset_password.handle': {
    methods: ["POST"],
    pattern: '/auth/reset-password',
    tokens: [{"old":"/auth/reset-password","type":0,"val":"auth","end":""},{"old":"/auth/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['auth.reset_password.handle']['types'],
  },
  'auth.logout': {
    methods: ["DELETE"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'wishlists.create': {
    methods: ["GET","HEAD"],
    pattern: '/wishlists/create',
    tokens: [{"old":"/wishlists/create","type":0,"val":"wishlists","end":""},{"old":"/wishlists/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['wishlists.create']['types'],
  },
  'wishlists.show': {
    methods: ["GET","HEAD"],
    pattern: '/wishlists/:id',
    tokens: [{"old":"/wishlists/:id","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['wishlists.show']['types'],
  },
  'wishlists.edit': {
    methods: ["GET","HEAD"],
    pattern: '/wishlists/:id/edit',
    tokens: [{"old":"/wishlists/:id/edit","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/edit","type":1,"val":"id","end":""},{"old":"/wishlists/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['wishlists.edit']['types'],
  },
  'wishlists.store': {
    methods: ["POST"],
    pattern: '/wishlists',
    tokens: [{"old":"/wishlists","type":0,"val":"wishlists","end":""}],
    types: placeholder as Registry['wishlists.store']['types'],
  },
  'wishlists.update': {
    methods: ["PUT"],
    pattern: '/wishlists/:id',
    tokens: [{"old":"/wishlists/:id","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['wishlists.update']['types'],
  },
  'wishlists.categories.delete': {
    methods: ["DELETE"],
    pattern: '/wishlists/:id/categories/:categoryId',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":1,"val":"categoryId","end":""}],
    types: placeholder as Registry['wishlists.categories.delete']['types'],
  },
  'wishlists.categories.store': {
    methods: ["POST"],
    pattern: '/wishlists/:id/categories',
    tokens: [{"old":"/wishlists/:id/categories","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['wishlists.categories.store']['types'],
  },
  'wishlists.categories.update': {
    methods: ["PUT"],
    pattern: '/wishlists/:id/categories/:categoryId',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId","type":1,"val":"categoryId","end":""}],
    types: placeholder as Registry['wishlists.categories.update']['types'],
  },
  'gifts.scrap': {
    methods: ["POST"],
    pattern: '/wishlists/:id/categories/:categoryId/gifts',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId/gifts","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts","type":1,"val":"categoryId","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts","type":0,"val":"gifts","end":""}],
    types: placeholder as Registry['gifts.scrap']['types'],
  },
  'gifts.edit': {
    methods: ["PATCH"],
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"categoryId","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"gifts","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"giftId","end":""}],
    types: placeholder as Registry['gifts.edit']['types'],
  },
  'gifts.book': {
    methods: ["PATCH"],
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId/book',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":1,"val":"categoryId","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":0,"val":"gifts","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":1,"val":"giftId","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId/book","type":0,"val":"book","end":""}],
    types: placeholder as Registry['gifts.book']['types'],
  },
  'gifts.delete': {
    methods: ["DELETE"],
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId',
    tokens: [{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"wishlists","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"id","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"categories","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"categoryId","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":0,"val":"gifts","end":""},{"old":"/wishlists/:id/categories/:categoryId/gifts/:giftId","type":1,"val":"giftId","end":""}],
    types: placeholder as Registry['gifts.delete']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'media.show': {
    methods: ["GET","HEAD"],
    pattern: '/img/*',
    tokens: [{"old":"/img/*","type":0,"val":"img","end":""},{"old":"/img/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['media.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
