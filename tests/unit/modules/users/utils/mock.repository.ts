import { vi } from 'vitest'
import type { IUserRepository } from '@/modules/users/user.interface.js'

/**
 * Creates a mock user repository
 * Simple approach - just cast to the interface type
 */

export const createMockUserRepository = (): IUserRepository => {
  return {
    create: vi.fn(),
    findAll: vi.fn(),
    // findById: vi.fn(),
    // findByEmail: vi.fn(),
    // update: vi.fn(),
    // delete: vi.fn()
  } as unknown as IUserRepository
}
