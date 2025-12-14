import mongoose from 'mongoose'
import { DATABASE_URL } from './env.js'

export async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL)
    // eslint-disable-next-line no-console
    console.log('MongoDB conectado!')
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err)
    process.exit(1)
  }
}
