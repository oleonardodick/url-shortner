import type { FastifyInstance } from 'fastify'
import { vi } from 'vitest'

export const createMockFastifyInstance = (): FastifyInstance => {
  return {
    bcrypt: {
      hash: vi.fn(),
      compare: vi.fn(),
    },
  } as unknown as FastifyInstance
}
