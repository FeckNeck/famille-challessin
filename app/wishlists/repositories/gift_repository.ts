import Gift from '#wishlists/models/gift'

export default class GiftRepository {
  async findOneByCategoryIdAndWishlistId(
    wishlistId: string,
    categoryId: string,
    giftId: string
  ): Promise<Gift> {
    return await Gift.query()
      .preload('category', (categoryQuery) =>
        categoryQuery
          .where('id', categoryId)
          .preload('wishlist', (wishlistQuery) => wishlistQuery.where('id', wishlistId))
      )
      .where('id', giftId)
      .firstOrFail()
  }
}
