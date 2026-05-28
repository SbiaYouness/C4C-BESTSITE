import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { setupSocketHandlers } from './socket/index.js'

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Setup socket handlers
setupSocketHandlers(io)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`
  🚀 C4C Server running on port ${PORT}
  
  Health: http://localhost:${PORT}/health
  Socket: ws://localhost:${PORT}
  `)
})
