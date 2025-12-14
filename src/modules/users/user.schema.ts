import { z } from 'zod/v4'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const getUserSchema = z.object({
  name: z.string(),
  email: z.string(),
})

export const getListUserSchema = z.object({
  users: z.array(getUserSchema),
})

export type ResponseUser = z.infer<typeof getUserSchema>
