import { create } from 'zustand'

export type GameType = 'code-duel' | 'bug-hunter' | 'guess-output'
export type GamePhase = 'waiting' | 'countdown' | 'playing' | 'judging' | 'results'

export interface Player {
  id: string
  name: string
  score?: number
  solved?: boolean
  progress?: number
}

export interface Problem {
  id: string
  title: string
  description: string
  examples: Array<{ input: string; output: string }>
  starterCode: string
  testCases: Array<{ input: any[]; expected?: any }>
}

export interface BugProblem {
  id: string
  title: string
  description: string
  buggyCode: string
  bugs: Array<{ line: number; description: string }>
  testCases: Array<{ input: any[]; expected: any }>
}

export interface OutputProblem {
  id: string
  code: string
  options: string[]
  correctIndex: number
}

export interface GameResult {
  winner: Player | null
  players: Array<Player & { time?: number; correct?: boolean }>
  draw?: boolean
}

interface GameState {
  // Connection
  connected: boolean
  roomId: string | null
  
  // Player
  player: Player | null
  opponents: Player[]
  
  // Game state
  gameType: GameType | null
  phase: GamePhase
  problem: Problem | BugProblem | OutputProblem | null
  
  // Timing
  timeLeft: number
  startTime: number | null
  
  // Code
  code: string
  
  // Results
  result: GameResult | null
  
  // Actions
  setConnected: (connected: boolean) => void
  setRoomId: (roomId: string | null) => void
  setPlayer: (player: Player) => void
  setOpponents: (opponents: Player[]) => void
  setGameType: (type: GameType) => void
  setPhase: (phase: GamePhase) => void
  setProblem: (problem: Problem | BugProblem | OutputProblem) => void
  setTimeLeft: (time: number) => void
  setStartTime: (time: number) => void
  setCode: (code: string) => void
  setResult: (result: GameResult) => void
  updateOpponent: (id: string, data: Partial<Player>) => void
  reset: () => void
}

const initialState = {
  connected: false,
  roomId: null,
  player: null,
  opponents: [],
  gameType: null,
  phase: 'waiting' as GamePhase,
  problem: null,
  timeLeft: 0,
  startTime: null,
  code: '',
  result: null,
}

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  
  setConnected: (connected) => set({ connected }),
  setRoomId: (roomId) => set({ roomId }),
  setPlayer: (player) => set({ player }),
  setOpponents: (opponents) => set({ opponents }),
  setGameType: (gameType) => set({ gameType }),
  setPhase: (phase) => set({ phase }),
  setProblem: (problem) => set({ problem }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setStartTime: (startTime) => set({ startTime }),
  setCode: (code) => set({ code }),
  setResult: (result) => set({ result }),
  
  updateOpponent: (id, data) => set((state) => ({
    opponents: state.opponents.map((o) => 
      o.id === id ? { ...o, ...data } : o
    )
  })),
  
  reset: () => set(initialState),
}))
