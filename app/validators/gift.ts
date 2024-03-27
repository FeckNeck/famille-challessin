import vine from '@vinejs/vine'

export const UpdateGiftValidator = vine.compile(
  vine.object({
    giverId: vine.string().uuid().optional().nullable(),
    giverName: vine.string().trim().toLowerCase().optional().nullable(),
    giverEmail: vine.string().trim().toLowerCase().email().optional().nullable(),
    isReserved: vine.boolean().optional(),
  })
)
