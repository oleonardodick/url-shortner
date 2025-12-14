import type { FastifyInstance } from 'fastify'
import type { ITextHasher } from './textHasher.interface.js'

export const bcryptTextHasher = (instance: FastifyInstance): ITextHasher => ({
  hash: async (text) => {
    return instance.bcrypt.hash(text)
  },
  compare: async (text, hash) => {
    return instance.bcrypt.compare(text, hash)
  },
})
