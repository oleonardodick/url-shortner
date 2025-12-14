import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { bcryptTextHasher } from '../common/crypto/bcrypt.textHasher.js'
import { userMongoRepository } from './database/mongo/user.mongo.repository.js'
import {
  createUserSchema,
  getListUserSchema,
  getUserSchema,
} from './user.schema.js'
import { userService } from './user.service.js'

export default function userRoutes(app: FastifyInstance) {
  const service = userService(userMongoRepository, bcryptTextHasher(app))
  const routes = app.withTypeProvider<ZodTypeProvider>()
  routes.post(
    '/api/users',
    {
      schema: {
        description: 'Create a new user',
        tags: ['Users'],
        body: createUserSchema,
        response: {
          201: getUserSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await service.createUser(request.body)
      return reply.status(201).send(user)
    },
  )

  app.get(
    '/api/users',
    {
      schema: {
        description: 'Find all the users',
        tags: ['Users'],
        response: {
          200: getListUserSchema,
        },
      },
    },
    async (_request, reply) => {
      const users = await service.getAllUsers()
      return reply.send(users)
    },
  )
}
