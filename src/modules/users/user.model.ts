import mongoose, { type Document, type Model } from 'mongoose'

export interface IUser {
  email: string
  name: string
  password: string
}

export interface UserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: '__v',
  },
)

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password // Don't expose password
  return obj
}

export const UserModel = mongoose.model<UserDocument, UserModel>(
  'User',
  userSchema,
)
