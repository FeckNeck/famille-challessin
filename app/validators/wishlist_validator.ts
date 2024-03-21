import vine from '@vinejs/vine'

export const wishlistValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().optional(),
    event_date: vine.date().optional(),
    imageUrl: vine.string().trim().optional(),
    isPublic: vine.boolean().optional(),
  })
)
