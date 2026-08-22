/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login.render': {
    methods: ["GET","HEAD"]
    pattern: '/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['render']>>>
    }
  }
  'auth.login.handle': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/controllers/login_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/controllers/login_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/login_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.forgot_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/auth/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['render']>>>
    }
  }
  'auth.forgot_password.handle': {
    methods: ["POST"]
    pattern: '/auth/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/controllers/forgot_password_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/controllers/forgot_password_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/forgot_password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.reset_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/auth/reset-password/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['render']>>>
    }
  }
  'auth.reset_password.handle': {
    methods: ["POST"]
    pattern: '/auth/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/controllers/reset_password_controller').default)['validator']>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/controllers/reset_password_controller').default)['validator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/reset_password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["DELETE"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/logout_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/logout_controller').default['handle']>>>
    }
  }
  'wishlists.create': {
    methods: ["GET","HEAD"]
    pattern: '/wishlists/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/create_wishlists_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/create_wishlists_controller').default['handle']>>>
    }
  }
  'wishlists.show': {
    methods: ["GET","HEAD"]
    pattern: '/wishlists/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/show_wishlists_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/show_wishlists_controller').default['render']>>>
    }
  }
  'wishlists.edit': {
    methods: ["GET","HEAD"]
    pattern: '/wishlists/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default['render']>>>
    }
  }
  'wishlists.store': {
    methods: ["POST"]
    pattern: '/wishlists'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/create_wishlists_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/create_wishlists_controller').default['handle']>>>
    }
  }
  'wishlists.update': {
    methods: ["PUT"]
    pattern: '/wishlists/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default)['createWishlistValidator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default)['createWishlistValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/wishlists/edit_wishlists_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'wishlists.categories.delete': {
    methods: ["DELETE"]
    pattern: '/wishlists/:id/categories/:categoryId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/remove_wishlist_categories_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/remove_wishlist_categories_controller').default['handle']>>>
    }
  }
  'wishlists.categories.store': {
    methods: ["POST"]
    pattern: '/wishlists/:id/categories'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/categories/create_wishlist_categories_controller').default)['createWishlistCategoryValidator']>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/categories/create_wishlist_categories_controller').default)['createWishlistCategoryValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/create_wishlist_categories_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/create_wishlist_categories_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'wishlists.categories.update': {
    methods: ["PUT"]
    pattern: '/wishlists/:id/categories/:categoryId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/categories/edit_wishlist_categories_controller').default)['updateWishlistCategoryValidator']>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/categories/edit_wishlist_categories_controller').default)['updateWishlistCategoryValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/edit_wishlist_categories_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/categories/edit_wishlist_categories_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gifts.scrap': {
    methods: ["POST"]
    pattern: '/wishlists/:id/categories/:categoryId/gifts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/gifts/scrap_gifts_controller').default)['scrapGiftsValidator']>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/gifts/scrap_gifts_controller').default)['scrapGiftsValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/scrap_gifts_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/scrap_gifts_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gifts.edit': {
    methods: ["PATCH"]
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/gifts/edit_gifts_controller').default)['editGiftValidator']>>
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue; giftId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/gifts/edit_gifts_controller').default)['editGiftValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/edit_gifts_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/edit_gifts_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gifts.book': {
    methods: ["PATCH"]
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId/book'
    types: {
      body: ExtractBody<InferInput<(typeof import('#modules/wishlists/controllers/gifts/book_gifts_controller').default)['bookGiftValidator']>>
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue; giftId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#modules/wishlists/controllers/gifts/book_gifts_controller').default)['bookGiftValidator']>>
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/book_gifts_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/book_gifts_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'gifts.delete': {
    methods: ["DELETE"]
    pattern: '/wishlists/:id/categories/:categoryId/gifts/:giftId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; categoryId: ParamValue; giftId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/remove_gifts_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/wishlists/controllers/gifts/remove_gifts_controller').default['handle']>>>
    }
  }
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/core/controllers/home_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/core/controllers/home_controller').default['render']>>>
    }
  }
  'media.show': {
    methods: ["GET","HEAD"]
    pattern: '/img/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#modules/core/controllers/show_media_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#modules/core/controllers/show_media_controller').default['render']>>>
    }
  }
}
