import WishlistCategory from '#wishlists/models/wishlist_category'

export default class WishlistCategoryRepository {
  async findOneByWishlistId(wishlistId: string, categoryId: string): Promise<WishlistCategory> {
    return await WishlistCategory.query()
      .where('id', categoryId)
      .preload('wishlist', (wishlistQuery) => wishlistQuery.where('id', wishlistId))
      .firstOrFail()
  }
}
