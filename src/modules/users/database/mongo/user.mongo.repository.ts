import type { IUserRepository } from '../../user.interface.js'
import { type UserDocument, UserModel } from '../../user.model.js'
import type { CreateUserInput } from '../../user.schema.js'

const createUserMongoRepository = (): IUserRepository => ({
  /**
   * Create a new user
   */
  create: async (data: CreateUserInput): Promise<UserDocument> => {
    const user = await UserModel.create(data)
    return user
  },

  /**
   * Find all users
   * Use .lean() for better performance when you don't need Mongoose methods
   */
  findAll: async (): Promise<UserDocument[]> => {
    return await UserModel.find()
      .select('-password') // Exclude password
      .lean() // Convert to plain JavaScript object (faster)
      .exec()
  },
})

export const userMongoRepository = createUserMongoRepository()
