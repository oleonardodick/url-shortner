import { vi } from 'vitest'
import { bcryptTextHasher } from '@/modules/common/crypto/bcrypt.textHasher.js'
import { userService } from '@/modules/users/user.service.js'
import { createMockFastifyInstance } from '../common/utils/mock.instance.js'
import { createMockUserRepository } from './utils/mock.repository.js'
import {
  createMockUserDocument,
  createMockUserInput,
} from './utils/mock.user.factory.js'

describe('UserService', () => {
  test('should create a user successfully', async () => {
    // Arrange
    const mockRepository = createMockUserRepository()
    const mockFastifyInstance = createMockFastifyInstance()
    const service = userService(
      mockRepository,
      bcryptTextHasher(mockFastifyInstance),
    )

    const userInput = createMockUserInput()
    const expectedUser = createMockUserDocument()

    vi.mocked(mockRepository.create).mockResolvedValue(expectedUser)
    vi.mocked(mockFastifyInstance.bcrypt.hash).mockResolvedValue(
      expectedUser.password,
    )

    // Act
    const result = await service.createUser(userInput)

    // Assert
    expect(mockRepository.create).toHaveBeenCalledWith(userInput)
    expect(result).toEqual(expectedUser)
  })
})
