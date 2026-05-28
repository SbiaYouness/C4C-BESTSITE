import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useGameStore } from '@/store/gameStore'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

interface UseSocketOptions {
  enabled?: boolean
}

export function useSocket(options?: UseSocketOptions) {
  const enabled = options?.enabled ?? true
  const socketRef = useRef<Socket | null>(null)
  const { setConnected, setRoomId, setOpponents, setPhase, setProblem, setTimeLeft, setResult, updateOpponent } = useGameStore()

  useEffect(() => {
    if (!enabled) {
      setConnected(false)
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      return
    }

    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to server')
      setConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
      setConnected(false)
    })

    socket.on('game:start', (data) => {
      setRoomId(data.roomId)
      setOpponents(data.opponents)
      setProblem(data.problem)
      setPhase('countdown')
    })

    socket.on('game:countdown', (data) => {
      setTimeLeft(data.count)
    })

    socket.on('game:play', () => {
      setPhase('playing')
    })

    socket.on('game:timeUpdate', (data) => {
      setTimeLeft(data.timeLeft)
    })

    socket.on('game:opponentUpdate', (data) => {
      updateOpponent(data.playerId, data)
    })

    socket.on('game:end', (data) => {
      setPhase('results')
      setResult(data.result)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [enabled])

  const joinQueue = useCallback((gameType: string, playerName: string) => {
    socketRef.current?.emit('queue:join', { gameType, playerName })
  }, [])

  const leaveQueue = useCallback(() => {
    socketRef.current?.emit('queue:leave')
  }, [])

  const submitCode = useCallback((code: string) => {
    socketRef.current?.emit('game:submit', { code })
  }, [])

  const submitAnswer = useCallback((answerIndex: number) => {
    socketRef.current?.emit('game:answer', { answerIndex })
  }, [])

  return {
    socket: socketRef.current,
    connected: useGameStore((s) => s.connected),
    joinQueue,
    leaveQueue,
    submitCode,
    submitAnswer,
  }
}
