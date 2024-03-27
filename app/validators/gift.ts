import vine from '@vinejs/vine'

export const UpdateGiftValidator = vine.compile(
  vine.object({
    giverId: vine.string().uuid().optional(),
    giverName: vine.string().trim().toLowerCase().optional(),
    giverEmail: vine.string().trim().toLowerCase().email().optional(),
    isReserved: vine.boolean().optional(),
  })
)
