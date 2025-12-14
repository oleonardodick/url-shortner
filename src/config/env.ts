import dotenv from 'dotenv'

dotenv.config()

export const PORT = Number(process.env.PORT) || 3333
export const DATABASE_URL = process.env.DATABASE_URL || ''
export const SALT_FACTOR = Number(process.env.SALT_FACTOR) || 12
