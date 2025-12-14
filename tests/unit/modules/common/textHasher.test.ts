import { vi } from 'vitest'
import { bcryptTextHasher } from '@/modules/common/crypto/bcrypt.textHasher.js'
import { createMockFastifyInstance } from './utils/mock.instance.js'

describe('Text Hasher', () => {
  test('should hash the text', async () => {
    //Arrange
    const plainText = 'password'
    const hashedText = 'hashed-password'
    const mockInstance = createMockFastifyInstance()
    const textHasher = bcryptTextHasher(mockInstance)
    vi.mocked(mockInstance.bcrypt.hash).mockResolvedValue(hashedText)

    //Act
    const result = await textHasher.hash(plainText)

    //Assert
    expect(mockInstance.bcrypt.hash).toHaveBeenCalledWith(plainText)
    expect(result).toBe(hashedText)
    expect(result).not.toBe(plainText)
  })

  test('should return success when comparing the strings', async () => {
    //Arrange
    const plainText = 'password'
    const hashedText = 'hashed-password'
    const mockInstance = createMockFastifyInstance()
    const textHasher = bcryptTextHasher(mockInstance)
    vi.mocked(mockInstance.bcrypt.compare).mockResolvedValue(true)

    //Act
    const result = await textHasher.compare(plainText, hashedText)

    //Arrange
    expect(mockInstance.bcrypt.compare).toHaveBeenCalledWith(
      plainText,
      hashedText,
    )
    expect(result).toBe(true)
  })
})
