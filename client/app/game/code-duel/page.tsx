'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { 
  Play, Send, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, Zap, Code2
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, Problem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Countdown Overlay
function CountdownOverlay({ count }: { count: number }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={count}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="text-9xl font-bold gradient-text"
      >
        {count > 0 ? count : 'GO!'}
      </motion.div>
    </motion.div>
  )
}

// Results Overlay
function ResultsOverlay({ result, player, onPlayAgain }: { 
  result: any; 
  player: any;
  onPlayAgain: () => void;
}) {
  const isWinner = result.winner?.id === player?.id
  const isDraw = result.draw

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg p-8 rounded-3xl glass text-center"
      >
        {isDraw ? (
          <>
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-3xl font-bold mb-2">It's a Draw!</h2>
          </>
        ) : isWinner ? (
          <>
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              🏆
            </motion.div>
            <h2 className="text-3xl font-bold text-green-400 mb-2">Victory!</h2>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-3xl font-bold text-red-400 mb-2">Defeat</h2>
          </>
        )}

        <div className="mt-8 space-y-4">
          {result.players.map((p: any, i: number) => (
            <div 
              key={p.id}
              className={`p-4 rounded-xl ${p.id === player?.id ? 'bg-primary-500/20' : 'bg-dark-800/50'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {i === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                  <span className="font-semibold">{p.name}</span>
                  {p.id === player?.id && <span className="text-xs text-primary-400">(You)</span>}
                </div>
                <div className="flex items-center gap-4">
                  {p.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {p.time && <span className="text-dark-300">{(p.time / 1000).toFixed(2)}s</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href="/lobby"
            className="flex-1 py-3 rounded-xl glass hover:bg-dark-700/50 transition-all font-semibold"
          >
            Back to Lobby
          </Link>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 font-semibold"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CodeDuelPage() {
  const router = useRouter()
  
  const { 
    player, opponents, phase, problem, timeLeft, code, result,
    setCode, setPhase
  } = useGameStore()
  const { socket, submitCode } = useSocket()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; input: string; expected: string; got: string }>>([])
  const [countdown, setCountdown] = useState(3)

  // Handle countdown
  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setPhase('playing')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [phase, setPhase])

  // Initialize with problem starter code
  useEffect(() => {
    if (problem && 'starterCode' in problem) {
      setCode(problem.starterCode)
    }
  }, [problem, setCode])

  const handleSubmit = useCallback(() => {
    if (isSubmitting || phase !== 'playing') return
    setIsSubmitting(true)
    submitCode(code)
    
    // Reset after a moment (server will send result)
    setTimeout(() => setIsSubmitting(false), 2000)
  }, [code, isSubmitting, phase, submitCode])

  const handlePlayAgain = () => {
    router.push('/lobby?game=code-duel')
  }

  // Keyboard shortcut for submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSubmit])

  const typedProblem = problem as Problem | null

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary-500" />
            <span className="font-bold">Code Duel</span>
          </div>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          timeLeft <= 30 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        {/* Players */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-400" />
            </div>
            <span className="font-semibold">{player?.name || 'You'}</span>
          </div>
          <span className="text-dark-500">vs</span>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-red-400" />
              </div>
              <span className="font-semibold">{opp.name}</span>
              {opp.solved && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div className="w-[400px] flex-shrink-0 border-r border-dark-800 overflow-y-auto p-6">
          {typedProblem ? (
            <>
              <h2 className="text-2xl font-bold mb-4">{typedProblem.title}</h2>
              <div className="prose prose-invert prose-sm">
                <p className="text-dark-300 whitespace-pre-wrap">{typedProblem.description}</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Examples</h3>
                {typedProblem.examples.map((ex, i) => (
                  <div key={i} className="bg-dark-800/50 rounded-lg p-4 mb-3 font-mono text-sm">
                    <div className="text-dark-400 mb-1">Input:</div>
                    <div className="text-white mb-2">{ex.input}</div>
                    <div className="text-dark-400 mb-1">Output:</div>
                    <div className="text-green-400">{ex.output}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          )}
        </div>

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
              }}
            />
          </div>

          {/* Submit Bar */}
          <div className="flex-shrink-0 p-4 border-t border-dark-800 flex items-center justify-between bg-dark-900">
            <div className="text-sm text-dark-400">
              Press <kbd className="px-2 py-1 rounded bg-dark-700 font-mono">Ctrl</kbd> + 
              <kbd className="px-2 py-1 rounded bg-dark-700 font-mono ml-1">Enter</kbd> to submit
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || phase !== 'playing'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 
                         font-bold flex items-center gap-2 disabled:opacity-50 
                         hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Solution
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {phase === 'countdown' && <CountdownOverlay count={countdown} />}
        {phase === 'results' && result && (
          <ResultsOverlay result={result} player={player} onPlayAgain={handlePlayAgain} />
        )}
      </AnimatePresence>
    </div>
  )
}
