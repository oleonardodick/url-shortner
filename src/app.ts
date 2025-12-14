import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import { fastifyBcrypt } from 'fastify-bcrypt'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { SALT_FACTOR } from '@/config/env.js'
import userRoutes from './modules/users/user.routes.js'

export function buildApp() {
  const app = fastify({
    logger: {
      level: 'info',
    },
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Url Shortner',
        description: 'API for a URL Shortner',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(ScalarApiReference, {
    routePrefix: '/docs',
  })

  app.register(fastifyBcrypt, {
    saltWorkFactor: SALT_FACTOR,
  })

  app.register(userRoutes)

  return app
}
