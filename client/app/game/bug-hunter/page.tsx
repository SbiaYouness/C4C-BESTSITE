'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { 
  Bug, Send, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, AlertTriangle, Crosshair
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, BugProblem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function BugHunterPage() {
  const router = useRouter()
  
  const { 
    player, opponents, phase, problem, timeLeft, code, result,
    setCode, setPhase
  } = useGameStore()
  const { socket, submitCode } = useSocket()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bugsFound, setBugsFound] = useState(0)
  const [countdown, setCountdown] = useState(3)

  const typedProblem = problem as BugProblem | null

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

  useEffect(() => {
    if (typedProblem) {
      setCode(typedProblem.buggyCode)
    }
  }, [typedProblem, setCode])

  const handleSubmit = useCallback(() => {
    if (isSubmitting || phase !== 'playing') return
    setIsSubmitting(true)
    submitCode(code)
    setTimeout(() => setIsSubmitting(false), 2000)
  }, [code, isSubmitting, phase, submitCode])

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-green-500" />
            <span className="font-bold">Bug Hunter</span>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          timeLeft <= 30 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-400" />
            <span>{player?.name}</span>
          </div>
          <span className="text-dark-500">vs</span>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <User className="w-4 h-4 text-red-400" />
              <span>{opp.name}</span>
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
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Mission</span>
                </div>
                <p className="text-dark-300">{typedProblem.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Bugs to find:</span>
                  <span className="font-bold text-red-400">{typedProblem.bugs.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Bugs fixed:</span>
                  <span className="font-bold text-green-400">{bugsFound}/{typedProblem.bugs.length}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-dark-800/50">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-primary-400" />
                  Tips
                </h3>
                <ul className="text-sm text-dark-400 space-y-1">
                  <li>• Look for syntax errors</li>
                  <li>• Check variable names</li>
                  <li>• Verify logic conditions</li>
                  <li>• Test edge cases mentally</li>
                </ul>
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
          <div className="flex-1">
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
              }}
            />
          </div>

          <div className="flex-shrink-0 p-4 border-t border-dark-800 flex items-center justify-between bg-dark-900">
            <div className="text-sm text-dark-400">
              Fix all bugs and submit your corrected code
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || phase !== 'playing'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 
                         font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Submit Fix
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Overlay */}
      <AnimatePresence>
        {phase === 'countdown' && (
          <motion.div 
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-9xl font-bold gradient-text"
            >
              {countdown > 0 ? countdown : 'HUNT!'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
