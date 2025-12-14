import type { ITextHasher } from '../common/crypto/textHasher.interface.js'
// import { userMongoRepository } from './database/mongo/user.mongo.repository.js'
import type { IUserRepository } from './user.interface.js'
import type { UserDocument } from './user.model.js'
import type { CreateUserInput } from './user.schema.js'

export const userService = (repo: IUserRepository, hasher: ITextHasher) => ({
  createUser: async (data: CreateUserInput): Promise<UserDocument> => {
    data.password = await hasher.hash(data.password)
    return await repo.create(data)
  },

  getAllUsers: async (): Promise<UserDocument[]> => {
    return await repo.findAll()
  },
})

// export const userService = createUserService(userMongoRepository, bcryptTextHasher)
