'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Code2, Users, Swords, Bug, HelpCircle, ArrowLeft, 
  Loader2, User, Play, Clock, Zap, Crown
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'

export const dynamic = 'force-dynamic'

type LobbyMode = 'online' | 'offline' | 'bot'

const games = [
  {
    id: 'code-duel',
    title: 'Code Duel',
    icon: Swords,
    description: '1v1 real-time coding battle',
    color: 'from-red-500 to-orange-500',
    players: '2 players'
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    icon: Bug,
    description: 'Find and fix bugs fastest',
    color: 'from-green-500 to-emerald-500',
    players: '2-4 players'
  },
  {
    id: 'guess-output',
    title: 'Guess the Output',
    icon: HelpCircle,
    description: 'Predict what the code prints',
    color: 'from-purple-500 to-pink-500',
    players: '2-8 players'
  }
]

export default function LobbyPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<LobbyMode>('online')
  const [isSearching, setIsSearching] = useState(false)
  const [playersInQueue, setPlayersInQueue] = useState(0)
  const shouldConnectSocket = selectedMode === 'online' || isSearching
  
  const { socket, connected, joinQueue, leaveQueue } = useSocket({ enabled: shouldConnectSocket })
  const { setPlayer } = useGameStore()

  // Check URL params for pre-selected game
  useEffect(() => {
    const gameParam = new URLSearchParams(window.location.search).get('game')
    if (gameParam && games.find(g => g.id === gameParam)) {
      setSelectedGame(gameParam)
    }
  }, [])

  // Handle socket events
  useEffect(() => {
    if (!socket) return

    socket.on('queue:update', (data: { count: number }) => {
      setPlayersInQueue(data.count)
    })

    socket.on('match:found', (data: { roomId: string; gameType: string }) => {
      setIsSearching(false)
      router.push(`/game/${data.gameType}?room=${data.roomId}`)
    })

    return () => {
      socket.off('queue:update')
      socket.off('match:found')
    }
  }, [socket, router])

  const handleJoinQueue = () => {
    if (!username.trim() || !selectedGame) return

    window.localStorage.setItem('c4c-player-name', username.trim())

    if (selectedMode !== 'online') {
      router.push(`/local/${selectedGame}/${selectedMode}`)
      return
    }
    
    setPlayer({ id: socket?.id || '', name: username.trim() })
    joinQueue(selectedGame, username.trim())
    setIsSearching(true)
  }

  const handleLeaveQueue = () => {
    leaveQueue()
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">C4C</span>
          </div>
          
          {selectedMode !== 'online' && !isSearching ? (
            <div className="flex items-center gap-2 text-sky-400">
              <div className="w-2 h-2 bg-sky-400 rounded-full" />
              <span className="text-sm">Local Mode</span>
            </div>
          ) : connected ? (
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Connecting...</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Game Lobby</h1>
          <p className="text-dark-300 text-lg">Choose your game and find opponents</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Username Input */}
              <div className="max-w-md mx-auto mb-12">
                <label className="block text-sm text-dark-300 mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-800/50 border border-dark-700 
                               focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                               transition-all text-white placeholder:text-dark-500"
                    maxLength={20}
                  />
                </div>
              </div>

              {/* Game Selection */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`relative p-6 rounded-2xl glass text-left transition-all duration-300
                               ${selectedGame === game.id 
                                 ? 'ring-2 ring-primary-500 bg-dark-800/50' 
                                 : 'hover:bg-dark-800/30'}`}
                  >
                    {selectedGame === game.id && (
                      <motion.div
                        layoutId="selected"
                        className="absolute inset-0 rounded-2xl ring-2 ring-primary-500"
                      />
                    )}
                    
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} 
                                    flex items-center justify-center mb-4`}>
                      <game.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-dark-400 text-sm mb-3">{game.description}</p>
                    <div className="flex items-center gap-2 text-dark-500 text-sm">
                      <Users className="w-4 h-4" />
                      {game.players}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Join Button */}
              <div className="text-center">
                <div className="max-w-lg mx-auto mb-6 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedMode('online')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedMode === 'online'
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    Online
                  </button>
                  <button
                    onClick={() => setSelectedMode('offline')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedMode === 'offline'
                        ? 'bg-sky-500 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    Offline
                  </button>
                  <button
                    onClick={() => setSelectedMode('bot')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      selectedMode === 'bot'
                        ? 'bg-orange-500 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    }`}
                  >
                    vs Bot
                  </button>
                </div>

                <button
                  onClick={handleJoinQueue}
                  disabled={!username.trim() || !selectedGame || (selectedMode === 'online' && !connected)}
                  className="px-12 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 
                             font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary-500/25 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                             flex items-center gap-3 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  {selectedMode === 'online'
                    ? 'Find Match'
                    : selectedMode === 'bot'
                      ? 'Play vs Bot'
                      : 'Start Offline'}
                </button>
                {selectedMode !== 'online' && (
                  <p className="text-dark-400 text-sm mt-3">
                    Runs fully local without waiting for matchmaking.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary-500/30"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary-500/30"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Finding Opponents...</h2>
              <p className="text-dark-400 mb-2">
                Playing as <span className="text-white font-semibold">{username}</span>
              </p>
              <p className="text-dark-500 text-sm mb-8">
                {playersInQueue} player{playersInQueue !== 1 ? 's' : ''} in queue
              </p>
              
              <button
                onClick={handleLeaveQueue}
                className="px-8 py-3 rounded-xl glass hover:bg-dark-800/50 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
