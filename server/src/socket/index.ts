import { Server, Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import { problems, bugProblems, outputProblems } from '../game/problems.js'
import { validateCode, validateBugFix, validateAnswer } from '../game/validator.js'

interface Player {
  id: string
  socketId: string
  name: string
  score: number
  solved: boolean
  solveTime: number | null
}

interface GameRoom {
  id: string
  gameType: string
  players: Player[]
  problem: any
  phase: 'waiting' | 'countdown' | 'playing' | 'results'
  startTime: number | null
  timeLimit: number
  timer: NodeJS.Timeout | null
}

interface QueueEntry {
  socketId: string
  playerName: string
  gameType: string
  joinedAt: number
}

const queues: Map<string, QueueEntry[]> = new Map([
  ['code-duel', []],
  ['bug-hunter', []],
  ['guess-output', []]
])

const rooms: Map<string, GameRoom> = new Map()
const playerToRoom: Map<string, string> = new Map()

const GAME_SETTINGS = {
  'code-duel': { minPlayers: 2, maxPlayers: 2, timeLimit: 300 },
  'bug-hunter': { minPlayers: 2, maxPlayers: 4, timeLimit: 180 },
  'guess-output': { minPlayers: 2, maxPlayers: 8, timeLimit: 15 }
}

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`Player connected: ${socket.id}`)

    // Join queue
    socket.on('queue:join', ({ gameType, playerName }) => {
      const queue = queues.get(gameType)
      if (!queue) return

      // Remove from any existing queue
      queues.forEach((q, type) => {
        const idx = q.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) q.splice(idx, 1)
      })

      // Add to queue
      queue.push({
        socketId: socket.id,
        playerName,
        gameType,
        joinedAt: Date.now()
      })

      // Broadcast queue update
      io.emit('queue:update', { count: queue.length })
      console.log(`${playerName} joined ${gameType} queue. Queue size: ${queue.length}`)

      // Check for match
      checkForMatch(io, gameType)
    })

    // Leave queue
    socket.on('queue:leave', () => {
      queues.forEach((queue, type) => {
        const idx = queue.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) {
          queue.splice(idx, 1)
          io.emit('queue:update', { count: queue.length })
        }
      })
    })

    // Submit code (Code Duel & Bug Hunter)
    socket.on('game:submit', ({ code }) => {
      const roomId = playerToRoom.get(socket.id)
      if (!roomId) return

      const room = rooms.get(roomId)
      if (!room || room.phase !== 'playing') return

      const player = room.players.find(p => p.socketId === socket.id)
      if (!player || player.solved) return

      const solveTime = Date.now() - (room.startTime || 0)

      // Validate submission
      let result
      if (room.gameType === 'code-duel') {
        result = validateCode(code, room.problem)
      } else if (room.gameType === 'bug-hunter') {
        result = validateBugFix(code, room.problem)
      }

      if (result?.correct) {
        player.solved = true
        player.solveTime = solveTime
        player.score = calculateScore(room.timeLimit * 1000, solveTime, true)

        // Notify all players
        io.to(roomId).emit('game:opponentUpdate', {
          playerId: player.id,
          solved: true,
          time: solveTime
        })

        // Check if game should end
        checkGameEnd(io, room)
      } else {
        socket.emit('game:submitResult', { 
          correct: false, 
          message: result?.message || 'Incorrect solution'
        })
      }
    })

    // Submit answer (Guess Output)
    socket.on('game:answer', ({ answerIndex }) => {
      const roomId = playerToRoom.get(socket.id)
      if (!roomId) return

      const room = rooms.get(roomId)
      if (!room || room.phase !== 'playing') return

      const player = room.players.find(p => p.socketId === socket.id)
      if (!player || player.solved) return

      const answerTime = Date.now() - (room.startTime || 0)
      const correct = validateAnswer(answerIndex, room.problem)

      player.solved = true
      player.solveTime = answerTime
      player.score += correct ? calculateScore(room.timeLimit * 1000, answerTime, true) : 0

      io.to(roomId).emit('game:opponentUpdate', {
        playerId: player.id,
        answered: true,
        correct
      })

      // Check if all answered
      if (room.players.every(p => p.solved)) {
        endGame(io, room)
      }
    })

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`Player disconnected: ${socket.id}`)
      
      // Remove from queues
      queues.forEach((queue) => {
        const idx = queue.findIndex(e => e.socketId === socket.id)
        if (idx !== -1) queue.splice(idx, 1)
      })

      // Handle room disconnect
      const roomId = playerToRoom.get(socket.id)
      if (roomId) {
        const room = rooms.get(roomId)
        if (room && room.phase === 'playing') {
          // End game early if player disconnects
          endGame(io, room, socket.id)
        }
        playerToRoom.delete(socket.id)
      }
    })
  })
}

function checkForMatch(io: Server, gameType: string) {
  const queue = queues.get(gameType)
  const settings = GAME_SETTINGS[gameType as keyof typeof GAME_SETTINGS]
  
  if (!queue || !settings) return
  if (queue.length < settings.minPlayers) return

  // Take players for the match
  const matchPlayers = queue.splice(0, settings.minPlayers)
  
  // Create room
  const roomId = uuidv4()
  const problem = selectProblem(gameType)
  
  const room: GameRoom = {
    id: roomId,
    gameType,
    players: matchPlayers.map(p => ({
      id: uuidv4(),
      socketId: p.socketId,
      name: p.playerName,
      score: 0,
      solved: false,
      solveTime: null
    })),
    problem,
    phase: 'waiting',
    startTime: null,
    timeLimit: settings.timeLimit,
    timer: null
  }
  
  rooms.set(roomId, room)
  
  // Join room and map players
  matchPlayers.forEach(p => {
    const socket = io.sockets.sockets.get(p.socketId)
    if (socket) {
      socket.join(roomId)
      playerToRoom.set(p.socketId, roomId)
    }
  })

  // Notify players
  room.players.forEach(player => {
    const socket = io.sockets.sockets.get(player.socketId)
    if (socket) {
      socket.emit('match:found', { roomId, gameType })
      
      socket.emit('game:start', {
        roomId,
        opponents: room.players.filter(p => p.socketId !== player.socketId).map(p => ({
          id: p.id,
          name: p.name
        })),
        problem: sanitizeProblem(problem, gameType)
      })
    }
  })

  // Start countdown
  startCountdown(io, room)
}

function startCountdown(io: Server, room: GameRoom) {
  room.phase = 'countdown'
  let count = 3
  
  const countdownInterval = setInterval(() => {
    io.to(room.id).emit('game:countdown', { count })
    count--
    
    if (count < 0) {
      clearInterval(countdownInterval)
      startGame(io, room)
    }
  }, 1000)
}

function startGame(io: Server, room: GameRoom) {
  room.phase = 'playing'
  room.startTime = Date.now()
  
  io.to(room.id).emit('game:play')
  
  // Start game timer
  room.timer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - (room.startTime || 0)) / 1000)
    const timeLeft = Math.max(0, room.timeLimit - elapsed)
    
    io.to(room.id).emit('game:timeUpdate', { timeLeft })
    
    if (timeLeft <= 0) {
      endGame(io, room)
    }
  }, 1000)
}

function checkGameEnd(io: Server, room: GameRoom) {
  // For Code Duel: end when one player solves
  if (room.gameType === 'code-duel') {
    if (room.players.some(p => p.solved)) {
      endGame(io, room)
    }
  }
  // For Bug Hunter: end when all solve or time up
  else if (room.gameType === 'bug-hunter') {
    if (room.players.every(p => p.solved)) {
      endGame(io, room)
    }
  }
}

function endGame(io: Server, room: GameRoom, disconnectedId?: string) {
  if (room.phase === 'results') return
  
  room.phase = 'results'
  if (room.timer) clearInterval(room.timer)

  // Determine winner
  const solvedPlayers = room.players.filter(p => p.solved && p.socketId !== disconnectedId)
  let winner: Player | null = null
  let draw = false

  if (solvedPlayers.length > 0) {
    solvedPlayers.sort((a, b) => (a.solveTime || Infinity) - (b.solveTime || Infinity))
    winner = solvedPlayers[0]
    
    // Check for draw (same time within 100ms)
    if (solvedPlayers.length > 1 && 
        Math.abs((solvedPlayers[0].solveTime || 0) - (solvedPlayers[1].solveTime || 0)) < 100) {
      draw = true
    }
  }

  const result = {
    winner: winner ? { id: winner.id, name: winner.name } : null,
    draw,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      score: p.score,
      correct: p.solved,
      time: p.solveTime,
      disconnected: p.socketId === disconnectedId
    }))
  }

  io.to(room.id).emit('game:end', { result })
  
  // Cleanup after delay
  setTimeout(() => {
    rooms.delete(room.id)
    room.players.forEach(p => playerToRoom.delete(p.socketId))
  }, 30000)
}

function calculateScore(maxTime: number, solveTime: number, correct: boolean): number {
  if (!correct) return 0
  const timeBonus = Math.floor((1 - solveTime / maxTime) * 500)
  return 500 + Math.max(0, timeBonus)
}

function selectProblem(gameType: string) {
  if (gameType === 'code-duel') {
    return problems[Math.floor(Math.random() * problems.length)]
  } else if (gameType === 'bug-hunter') {
    return bugProblems[Math.floor(Math.random() * bugProblems.length)]
  } else {
    return outputProblems[Math.floor(Math.random() * outputProblems.length)]
  }
}

function sanitizeProblem(problem: any, gameType: string) {
  if (gameType === 'code-duel') {
    // Don't send test case expected values to client
    return {
      ...problem,
      testCases: problem.testCases.map((tc: any) => ({ input: tc.input }))
    }
  } else if (gameType === 'bug-hunter') {
    // Don't send bug solutions
    return {
      ...problem,
      bugs: problem.bugs.map((b: any) => ({ line: b.line, description: b.description }))
    }
  }
  return problem
}
