'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Editor from '@monaco-editor/react'
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  CheckCircle,
  Clock,
  HelpCircle,
  Loader2,
  Send,
  Swords,
  Trophy,
  User,
  XCircle,
  Zap
} from 'lucide-react'
import { GameResult, GameType, OutputProblem, Problem, BugProblem } from '@/store/gameStore'
import { formatTime } from '@/lib/utils'
import {
  calculateScore,
  createBotPlan,
  getTimeLimitForGame,
  pickRandomProblem,
  validateBugFixSubmission,
  validateCodeSubmission,
  validateGuessOutputAnswer,
  BotPlan,
  LocalProblem
} from '@/lib/localGameEngine'

type PlayMode = 'offline' | 'bot'

type LocalPhase = 'countdown' | 'playing' | 'results'

interface RoundAttempt {
  id: string
  name: string
  correct: boolean
  timeMs: number | null
  score: number
}

const GAME_LABELS: Record<GameType, string> = {
  'code-duel': 'Code Duel',
  'bug-hunter': 'Bug Hunter',
  'guess-output': 'Guess the Output'
}

function parseGameType(raw: string | string[] | undefined): GameType | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value === 'code-duel' || value === 'bug-hunter' || value === 'guess-output') {
    return value
  }
  return null
}

function parseMode(raw: string | string[] | undefined): PlayMode | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value === 'offline' || value === 'bot') {
    return value
  }
  return null
}

function buildGameResult(attempts: RoundAttempt[]): GameResult {
  const sortedCorrect = attempts
    .filter((attempt) => attempt.correct)
    .sort((a, b) => {
      if (a.timeMs === null && b.timeMs === null) return 0
      if (a.timeMs === null) return 1
      if (b.timeMs === null) return -1
      if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs
      return b.score - a.score
    })

  const hasWinner = sortedCorrect.length > 0
  const winner = hasWinner ? { id: sortedCorrect[0].id, name: sortedCorrect[0].name } : null

  let draw = false
  if (sortedCorrect.length > 1 && sortedCorrect[0].timeMs !== null && sortedCorrect[1].timeMs !== null) {
    draw = Math.abs(sortedCorrect[0].timeMs - sortedCorrect[1].timeMs) < 100
  }

  return {
    winner,
    draw,
    players: attempts.map((attempt) => ({
      id: attempt.id,
      name: attempt.name,
      score: attempt.score,
      correct: attempt.correct,
      time: attempt.timeMs === null ? undefined : attempt.timeMs
    }))
  }
}

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
        className="text-8xl md:text-9xl font-bold gradient-text"
      >
        {count > 0 ? count : 'GO!'}
      </motion.div>
    </motion.div>
  )
}

function ResultsOverlay({
  result,
  playerId,
  onPlayAgain,
  lobbyHref
}: {
  result: GameResult
  playerId: string
  onPlayAgain: () => void
  lobbyHref: string
}) {
  const isWinner = result.winner?.id === playerId

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-xl p-8 rounded-3xl glass"
      >
        <div className="text-center mb-8">
          {result.draw ? (
            <>
              <div className="text-6xl mb-3">🤝</div>
              <h2 className="text-3xl font-bold">Draw Match</h2>
            </>
          ) : isWinner ? (
            <>
              <div className="text-6xl mb-3">🏆</div>
              <h2 className="text-3xl font-bold text-green-400">Victory!</h2>
            </>
          ) : (
            <>
              <div className="text-6xl mb-3">🤖</div>
              <h2 className="text-3xl font-bold text-red-400">Bot Wins</h2>
            </>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {result.players.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-xl border ${entry.id === playerId ? 'bg-primary-500/15 border-primary-500/30' : 'bg-dark-800/50 border-dark-700'}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {result.winner?.id === entry.id && <Trophy className="w-5 h-5 text-yellow-400" />}
                  <span className="font-semibold">{entry.name}</span>
                  {entry.id === playerId && <span className="text-xs text-primary-300">(You)</span>}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {entry.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-dark-300">{entry.score} pts</span>
                  <span className="text-dark-400">{entry.time ? (entry.time / 1000).toFixed(2) + 's' : '-'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href={lobbyHref}
            className="py-3 rounded-xl bg-dark-800 hover:bg-dark-700 transition-all text-center font-semibold"
          >
            Back to Lobby
          </Link>
          <button
            onClick={onPlayAgain}
            className="py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 font-semibold"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function LocalGamePage() {
  const params = useParams<{ game: string; mode: string }>()

  const gameType = useMemo(() => parseGameType(params.game), [params.game])
  const mode = useMemo(() => parseMode(params.mode), [params.mode])

  const [playerName, setPlayerName] = useState('Player')
  const [phase, setPhase] = useState<LocalPhase>('countdown')
  const [countdown, setCountdown] = useState(3)
  const [timeLeft, setTimeLeft] = useState(0)
  const [problem, setProblem] = useState<LocalProblem | null>(null)
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerLocked, setAnswerLocked] = useState(false)
  const [botPlan, setBotPlan] = useState<BotPlan | null>(null)
  const [botSolved, setBotSolved] = useState(false)

  const [playerAttempt, setPlayerAttempt] = useState<RoundAttempt | null>(null)

  const playerId = 'local-player'
  const botId = 'bot-1'
  const hasBot = mode === 'bot'

  const resetRound = useCallback(() => {
    if (!gameType || !mode) {
      return
    }

    const selectedProblem = pickRandomProblem(gameType)
    const roundTimeLimit = getTimeLimitForGame(gameType)

    setProblem(selectedProblem)
    setTimeLeft(roundTimeLimit)
    setPhase('countdown')
    setCountdown(3)
    setStartTime(null)
    setResult(null)
    setPlayerAttempt(null)
    setSubmissionMessage(null)
    setIsSubmitting(false)
    setSelectedAnswer(null)
    setAnswerLocked(false)
    setBotSolved(false)

    if ('starterCode' in selectedProblem) {
      setCode(selectedProblem.starterCode)
    } else if ('buggyCode' in selectedProblem) {
      setCode(selectedProblem.buggyCode)
    } else {
      setCode('')
    }

    setBotPlan(mode === 'bot' ? createBotPlan(gameType) : null)
  }, [gameType, mode])

  const finalizeRound = useCallback((currentPlayerAttempt: RoundAttempt | null) => {
    if (!gameType || !mode || phase === 'results') {
      return
    }

    const maxTimeMs = getTimeLimitForGame(gameType) * 1000

    const normalizedPlayerAttempt: RoundAttempt =
      currentPlayerAttempt ||
      ({
        id: playerId,
        name: playerName,
        correct: false,
        timeMs: null,
        score: 0
      } as RoundAttempt)

    const attempts: RoundAttempt[] = [normalizedPlayerAttempt]

    if (mode === 'bot') {
      const effectiveBotPlan = botPlan || createBotPlan(gameType)
      const botAttempt: RoundAttempt = {
        id: botId,
        name: 'C4C Bot',
        correct: effectiveBotPlan.correct,
        timeMs: effectiveBotPlan.correct ? effectiveBotPlan.timeMs : null,
        score: effectiveBotPlan.correct ? calculateScore(maxTimeMs, effectiveBotPlan.timeMs, true) : 0
      }
      attempts.push(botAttempt)
    }

    setResult(buildGameResult(attempts))
    setPhase('results')
  }, [botPlan, gameType, mode, phase, playerName])

  useEffect(() => {
    const storedName = window.localStorage.getItem('c4c-player-name')
    if (storedName && storedName.trim()) {
      setPlayerName(storedName.trim())
    }
  }, [])

  useEffect(() => {
    resetRound()
  }, [resetRound])

  useEffect(() => {
    if (phase !== 'countdown') {
      return
    }

    const timer = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(timer)
          setPhase('playing')
          setStartTime(Date.now())
          return 0
        }
        return previous - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (!gameType || phase !== 'playing' || !startTime) {
      return
    }

    const limit = getTimeLimitForGame(gameType)
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      const remaining = Math.max(0, limit - elapsedSeconds)
      setTimeLeft(remaining)

      if (remaining <= 0) {
        clearInterval(timer)
        finalizeRound(playerAttempt)
      }
    }, 250)

    return () => clearInterval(timer)
  }, [finalizeRound, gameType, phase, playerAttempt, startTime])

  useEffect(() => {
    if (!gameType || !hasBot || phase !== 'playing' || !botPlan) {
      return
    }

    if (!botPlan.correct) {
      return
    }

    if (gameType === 'guess-output') {
      return
    }

    const timeout = setTimeout(() => {
      setBotSolved(true)
      if (!playerAttempt?.correct) {
        finalizeRound(playerAttempt)
      }
    }, botPlan.timeMs)

    return () => clearTimeout(timeout)
  }, [botPlan, finalizeRound, gameType, hasBot, phase, playerAttempt])

  const submitCodeLikeRound = useCallback(() => {
    if (!gameType || phase !== 'playing' || !problem || !startTime || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    const elapsedMs = Date.now() - startTime
    const maxTimeMs = getTimeLimitForGame(gameType) * 1000

    const validation =
      gameType === 'code-duel'
        ? validateCodeSubmission(code, problem as Problem)
        : validateBugFixSubmission(code, problem as BugProblem)

    if (!validation.correct) {
      setSubmissionMessage(validation.message || 'Incorrect solution, try again.')
      setIsSubmitting(false)
      return
    }

    const nextAttempt: RoundAttempt = {
      id: playerId,
      name: playerName,
      correct: true,
      timeMs: elapsedMs,
      score: calculateScore(maxTimeMs, elapsedMs, true)
    }

    setSubmissionMessage('Correct solution submitted!')
    setPlayerAttempt(nextAttempt)
    setIsSubmitting(false)
    setBotSolved(hasBot && !!botPlan?.correct)
    finalizeRound(nextAttempt)
  }, [botPlan?.correct, code, finalizeRound, gameType, hasBot, isSubmitting, phase, playerName, problem, startTime])

  const submitGuessRound = useCallback((answerIndex: number) => {
    if (!gameType || gameType !== 'guess-output' || !problem || !startTime || answerLocked || phase !== 'playing') {
      return
    }

    const elapsedMs = Date.now() - startTime
    const maxTimeMs = getTimeLimitForGame(gameType) * 1000
    const correct = validateGuessOutputAnswer(answerIndex, problem as OutputProblem)

    const nextAttempt: RoundAttempt = {
      id: playerId,
      name: playerName,
      correct,
      timeMs: elapsedMs,
      score: correct ? calculateScore(maxTimeMs, elapsedMs, true) : 0
    }

    setSelectedAnswer(answerIndex)
    setAnswerLocked(true)
    setPlayerAttempt(nextAttempt)
    setSubmissionMessage(correct ? 'Correct answer!' : 'Wrong answer.')
    if (hasBot && botPlan?.correct) {
      setBotSolved(true)
    }

    finalizeRound(nextAttempt)
  }, [answerLocked, botPlan?.correct, finalizeRound, gameType, hasBot, phase, playerName, problem, startTime])

  if (!gameType || !mode) {
    return (
      <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md p-8 rounded-2xl glass text-center">
          <h1 className="text-2xl font-bold mb-3">Invalid Local Game Route</h1>
          <p className="text-dark-300 mb-6">Please choose a valid game mode from the lobby.</p>
          <Link href="/lobby" className="px-6 py-3 rounded-xl bg-primary-500 font-semibold inline-block">
            Back to Lobby
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-dark-950 text-white flex flex-col overflow-hidden">
      <header className="flex-shrink-0 px-6 py-4 border-b border-dark-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/lobby?game=${gameType}`} className="text-dark-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            {gameType === 'code-duel' && <Swords className="w-5 h-5 text-red-400" />}
            {gameType === 'bug-hunter' && <Bug className="w-5 h-5 text-green-400" />}
            {gameType === 'guess-output' && <HelpCircle className="w-5 h-5 text-purple-400" />}
            <span className="font-bold">{GAME_LABELS[gameType]}</span>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${mode === 'bot' ? 'bg-orange-500/20 text-orange-300' : 'bg-sky-500/20 text-sky-300'}`}>
            {mode === 'bot' ? 'BOT MODE' : 'OFFLINE MODE'}
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${timeLeft <= 10 ? 'bg-red-500/20 text-red-300' : 'bg-dark-800 text-dark-100'}`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary-400" />
            <span>{playerName}</span>
          </div>

          {hasBot && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange-400" />
              <span>C4C Bot</span>
              {botSolved && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
          )}
        </div>
      </header>

      {gameType !== 'guess-output' ? (
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[400px] flex-shrink-0 border-r border-dark-800 overflow-y-auto p-6">
            {!problem ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
              </div>
            ) : gameType === 'code-duel' ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{(problem as Problem).title}</h2>
                <p className="text-dark-300 whitespace-pre-wrap mb-6">{(problem as Problem).description}</p>
                <h3 className="font-semibold mb-3">Examples</h3>
                <div className="space-y-3">
                  {(problem as Problem).examples.map((example, index) => (
                    <div key={index} className="bg-dark-800/50 rounded-lg p-4 text-sm font-mono">
                      <div className="text-dark-400 mb-1">Input:</div>
                      <div className="mb-2">{example.input}</div>
                      <div className="text-dark-400 mb-1">Output:</div>
                      <div className="text-green-400">{example.output}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{(problem as BugProblem).title}</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-300 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Mission</span>
                  </div>
                  <p className="text-dark-200">{(problem as BugProblem).description}</p>
                </div>
                <h3 className="font-semibold mb-2">Known bug hints</h3>
                <ul className="space-y-2 text-sm text-dark-300">
                  {(problem as BugProblem).bugs.map((bug, index) => (
                    <li key={index} className="bg-dark-800/50 rounded-lg p-3">
                      Line {bug.line}: {bug.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
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
                  padding: { top: 14 },
                  lineNumbers: 'on',
                  lineNumbersMinChars: 3
                }}
              />
            </div>

            <div className="flex-shrink-0 p-4 border-t border-dark-800 bg-dark-900 flex items-center justify-between gap-4">
              <div className="text-sm text-dark-300 min-h-6">
                {submissionMessage || (phase === 'playing' ? 'Submit when you are confident with your answer.' : 'Get ready...')}
              </div>
              <button
                onClick={submitCodeLikeRound}
                disabled={phase !== 'playing' || isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 disabled:opacity-50 font-semibold flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
          {!problem ? (
            <Loader2 className="w-10 h-10 animate-spin text-primary-400" />
          ) : (
            <div className="w-full max-w-4xl">
              <div className="mb-8">
                <h2 className="text-center text-lg text-dark-300 mb-4">What will this code output?</h2>
                <div className="bg-dark-800 rounded-2xl p-6 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-dark-100">{(problem as OutputProblem).code}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(problem as OutputProblem).options.map((option, index) => {
                  const correctIndex = (problem as OutputProblem).correctIndex
                  const isCorrect = index === correctIndex
                  const isChosen = selectedAnswer === index

                  return (
                    <button
                      key={index}
                      onClick={() => submitGuessRound(index)}
                      disabled={answerLocked || phase !== 'playing'}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        answerLocked
                          ? isCorrect
                            ? 'bg-green-500/20 border-green-500'
                            : isChosen
                              ? 'bg-red-500/20 border-red-500'
                              : 'bg-dark-800/50 border-dark-700 opacity-70'
                          : 'bg-dark-800 border-dark-700 hover:border-primary-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-mono text-sm">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {submissionMessage && (
                <div className="mt-6 text-center text-lg font-semibold flex items-center justify-center gap-2">
                  {submissionMessage.includes('Correct') ? (
                    <>
                      <Zap className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">{submissionMessage}</span>
                    </>
                  ) : (
                    <span className="text-red-400">{submissionMessage}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {phase === 'countdown' && <CountdownOverlay count={countdown} />}
        {phase === 'results' && result && (
          <ResultsOverlay
            result={result}
            playerId={playerId}
            onPlayAgain={resetRound}
            lobbyHref={`/lobby?game=${gameType}`}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
