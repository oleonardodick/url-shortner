import type { UserDocument } from './user.model.js'
import type { CreateUserInput } from './user.schema.js'

export interface IUserRepository {
  create(data: CreateUserInput): Promise<UserDocument>
  findAll(): Promise<UserDocument[]>
}
