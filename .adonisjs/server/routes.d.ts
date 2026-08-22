import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login.render': { paramsTuple?: []; params?: {} }
    'auth.login.handle': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.handle': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.reset_password.handle': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'wishlists.create': { paramsTuple?: []; params?: {} }
    'wishlists.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.store': { paramsTuple?: []; params?: {} }
    'wishlists.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.categories.delete': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
    'wishlists.categories.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.categories.update': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
    'gifts.scrap': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
    'gifts.edit': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
    'gifts.book': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
    'gifts.delete': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  GET: {
    'auth.login.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'wishlists.create': { paramsTuple?: []; params?: {} }
    'wishlists.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  HEAD: {
    'auth.login.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'wishlists.create': { paramsTuple?: []; params?: {} }
    'wishlists.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'media.show': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
  }
  POST: {
    'auth.login.handle': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.handle': { paramsTuple?: []; params?: {} }
    'auth.reset_password.handle': { paramsTuple?: []; params?: {} }
    'wishlists.store': { paramsTuple?: []; params?: {} }
    'wishlists.categories.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gifts.scrap': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
  }
  DELETE: {
    'auth.logout': { paramsTuple?: []; params?: {} }
    'wishlists.categories.delete': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
    'gifts.delete': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
  }
  PUT: {
    'wishlists.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'wishlists.categories.update': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue} }
  }
  PATCH: {
    'gifts.edit': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
    'gifts.book': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'categoryId': ParamValue,'giftId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}