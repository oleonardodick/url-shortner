import { buildApp } from './app.js'
import { connectDB } from './config/database.js'
import { PORT } from './config/env.js'

async function start() {
  await connectDB()

  const app = buildApp()

  app.listen({ port: PORT, host: '0.0.0.0' }, () => {
    // eslint-disable-next-line no-console
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
}

start()
