import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { sequelize } from './models/index.js'
import { ensureDatabaseExists } from './src/db/bootstrap.js'

const app = express()
const PORT = Number(process.env.PORT || 3000)

app.use(express.json())
app.use(cors())

app.get('/', (_req, res) => {
  res.json({
    name: 'autoservice-api',
    status: 'ok',
    docsHint: 'Use /api routes'
  })
})

// Chrome DevTools may probe this path on localhost.
app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
  res.status(204).send()
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', routes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

const start = async () => {
  try {
    await ensureDatabaseExists()
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

start()
