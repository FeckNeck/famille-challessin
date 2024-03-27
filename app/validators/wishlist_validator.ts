import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const wishlistValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().optional(),
    eventDate: vine
      .date()
      .optional()
      .transform((value) => DateTime.fromJSDate(value)),
    imageUrl: vine.string().trim().optional(),
    isPublic: vine.boolean().optional(),
  })
)
