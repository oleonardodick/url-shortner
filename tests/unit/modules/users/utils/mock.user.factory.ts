import { Types } from 'mongoose'
import type { UserDocument } from '@/modules/users/user.model.js'
import type { CreateUserInput } from '@/modules/users/user.schema.js'
/**
 * Creates mock CreateUserInput (DTO)
 */
export const createMockUserInput = (
  overrides?: Partial<CreateUserInput>,
): CreateUserInput => ({
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
  ...overrides,
})

/**
 * Creates mock UserDocument (as returned from DB)
 */
export const createMockUserDocument = (
  overrides?: Partial<UserDocument>,
): UserDocument => {
  const defaults = {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashed_password',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    __v: 0,
  }

  return { ...defaults, ...overrides } as UserDocument
}

/**
 * Creates multiple mock user documents
 */
export const createMockUserDocuments = (count: number): UserDocument[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockUserDocument({
      _id: new Types.ObjectId(),
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
    }),
  )
}
