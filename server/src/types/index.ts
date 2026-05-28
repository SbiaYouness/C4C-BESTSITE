export interface Player {
  id: string
  socketId: string
  name: string
  score: number
  solved: boolean
  solveTime: number | null
}

export interface GameRoom {
  id: string
  gameType: 'code-duel' | 'bug-hunter' | 'guess-output'
  players: Player[]
  problem: any
  phase: 'waiting' | 'countdown' | 'playing' | 'results'
  startTime: number | null
  timeLimit: number
  timer: NodeJS.Timeout | null
}

export interface QueueEntry {
  socketId: string
  playerName: string
  gameType: string
  joinedAt: number
}

export interface TestCase {
  input: any[]
  expected: any
}

export interface Problem {
  id: string
  title: string
  description: string
  examples: Array<{ input: string; output: string }>
  starterCode: string
  testCases: TestCase[]
  solution: string
}

export interface BugProblem {
  id: string
  title: string
  description: string
  buggyCode: string
  bugs: Array<{ line: number; description: string }>
  correctCode: string
  testCases: TestCase[]
}

export interface OutputProblem {
  id: string
  code: string
  options: string[]
  correctIndex: number
}
