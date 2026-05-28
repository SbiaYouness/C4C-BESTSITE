'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, Clock, User, Trophy, XCircle, CheckCircle,
  ArrowLeft, Loader2, Zap
} from 'lucide-react'
import Link from 'next/link'
import { useGameStore, OutputProblem } from '@/store/gameStore'
import { useSocket } from '@/hooks/useSocket'
import { formatTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function GuessOutputPage() {
  const { 
    player, opponents, phase, problem, timeLeft, result,
    setPhase
  } = useGameStore()
  const { socket, submitAnswer } = useSocket()
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [roundNumber, setRoundNumber] = useState(1)
  const [scores, setScores] = useState<Record<string, number>>({})

  const typedProblem = problem as OutputProblem | null

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

  const handleAnswer = useCallback((index: number) => {
    if (hasAnswered || phase !== 'playing') return
    setSelectedAnswer(index)
    setHasAnswered(true)
    submitAnswer(index)
  }, [hasAnswered, phase, submitAnswer])

  return (
    <div className="h-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/lobby" className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span className="font-bold">Guess the Output</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-dark-800 text-sm">
            Round {roundNumber}
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          timeLeft <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-dark-800'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-400" />
            <span>{player?.name}</span>
            <span className="text-primary-400 font-bold">{scores[player?.id || ''] || 0}</span>
          </div>
          {opponents.map((opp) => (
            <div key={opp.id} className="flex items-center gap-2">
              <User className="w-4 h-4 text-dark-400" />
              <span>{opp.name}</span>
              <span className="text-dark-400 font-bold">{scores[opp.id] || 0}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        {typedProblem ? (
          <div className="w-full max-w-4xl">
            {/* Code Display */}
            <div className="mb-8">
              <h2 className="text-lg text-dark-300 mb-4 text-center">
                What will this code output?
              </h2>
              <div className="bg-dark-800 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-dark-100 whitespace-pre-wrap">{typedProblem.code}</pre>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {typedProblem.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: hasAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={hasAnswered}
                  className={`p-6 rounded-2xl text-left transition-all font-mono ${
                    hasAnswered
                      ? selectedAnswer === i
                        ? i === typedProblem.correctIndex
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-red-500/20 border-2 border-red-500'
                        : i === typedProblem.correctIndex
                          ? 'bg-green-500/20 border-2 border-green-500'
                          : 'bg-dark-800/50 opacity-50'
                      : 'bg-dark-800 hover:bg-dark-700 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      hasAnswered && i === typedProblem.correctIndex
                        ? 'bg-green-500 text-white'
                        : hasAnswered && selectedAnswer === i
                          ? 'bg-red-500 text-white'
                          : 'bg-dark-700 text-dark-300'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-lg">{option}</span>
                    {hasAnswered && i === typedProblem.correctIndex && (
                      <CheckCircle className="w-6 h-6 text-green-400 ml-auto" />
                    )}
                    {hasAnswered && selectedAnswer === i && i !== typedProblem.correctIndex && (
                      <XCircle className="w-6 h-6 text-red-400 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Answer Status */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                {selectedAnswer === typedProblem.correctIndex ? (
                  <div className="text-green-400 text-xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-6 h-6" />
                    Correct! +100 points
                  </div>
                ) : (
                  <div className="text-red-400 text-xl font-bold">
                    Wrong answer
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        )}
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
              {countdown > 0 ? countdown : 'GUESS!'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
