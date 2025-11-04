import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import vine from '@vinejs/vine'
import { ToastType } from '#core/enums/toast'
import WishlistPolicy from '#wishlists/policies/wishlist_policy'
import GiftRepository from '#wishlists/repositories/gift_repository'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EditGiftsController {
  static editGiftValidator = vine.compile(
    vine.object({
      title: vine.string().trim(),
      description: vine.string().trim().optional(),
      url: vine
        .string()
        .trim()
        .url({
          require_protocol: true,
          protocols: ['http', 'https'],
        })
        .optional(),
      price: vine.string().optional(),
      image: vine
        .file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg', 'webp'],
        })
        .optional(),
    })
  )

  constructor(protected giftRepository: GiftRepository) {}

  async handle({ request, response, bouncer, session }: HttpContext) {
    const payload = await request.validateUsing(EditGiftsController.editGiftValidator)

    const { id: wishlistId, categoryId, giftId } = request.params()

    const gift = await this.giftRepository.findOneByCategoryIdAndWishlistId(
      wishlistId,
      categoryId,
      giftId
    )

    await bouncer.with(WishlistPolicy).authorize('edit', gift.category.wishlist)

    if (payload.image) {
      if (!payload.image.isValid) {
        return response.badRequest({ errors: payload.image.errors })
      }

      const fileName = `${cuid()}.${payload.image.extname}`

      await payload.image.moveToDisk(fileName)

      gift?.merge({ image: fileName })
    }

    gift.merge({
      title: payload.title,
      description: payload.description,
      url: payload.url,
      price: payload.price,
    })

    await gift.save()

    session.flash('toasts', {
      type: ToastType.SUCCESS,
      message: 'Le cadeau a été mis à jour avec succès.',
    })

    return response.redirect().back()
  }
}
