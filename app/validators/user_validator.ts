import vine from '@vinejs/vine'

export const RegisterUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .toLowerCase()
      .email()
      .unique(async (db, value) => !(await db.from('users').where('email', value).first())),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    username: vine
      .string()
      .trim()
      .toLowerCase()
      .minLength(3)
      .maxLength(32)
      .unique(async (db, value) => !(await db.from('users').where('username', value).first())),
  })
)
