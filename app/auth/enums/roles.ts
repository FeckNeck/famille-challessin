export const Roles = {
  User: 1,
  Admin: 2,
} as const

export type Roles = (typeof Roles)[keyof typeof Roles]
