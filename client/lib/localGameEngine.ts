import { BugProblem, GameType, OutputProblem, Problem } from '@/store/gameStore'

export type LocalProblem = Problem | BugProblem | OutputProblem

export interface LocalValidationResult {
  correct: boolean
  message?: string
}

export interface BotPlan {
  correct: boolean
  timeMs: number
}

const CODE_DUEL_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    starterCode: `function twoSum(nums, target) {\n  // Your code here\n  \n}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[1, 2, 3, 4, 5], 9], expected: [3, 4] }
    ]
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' }
    ],
    starterCode: `function isPalindrome(x) {\n  // Your code here\n  \n}`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [12321], expected: true }
    ]
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: `Given an integer n, return a string array answer from 1 to n with FizzBuzz rules.`,
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' }
    ],
    starterCode: `function fizzBuzz(n) {\n  // Your code here\n  \n}`,
    testCases: [
      { input: [3], expected: ['1', '2', 'Fizz'] },
      { input: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { input: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] }
    ]
  }
]

const BUG_HUNTER_PROBLEMS: BugProblem[] = [
  {
    id: 'sum-array-bug',
    title: 'Sum Array Bug',
    description: 'Fix the function that should return the sum of all numbers in an array.',
    buggyCode: `function sumArray(arr) {\n  let sum = 1;\n  for (let i = 0; i <= arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}`,
    bugs: [
      { line: 2, description: 'Initial sum value is wrong' },
      { line: 3, description: 'Loop condition causes out of bounds' }
    ],
    testCases: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[10, 20, 30, 40]], expected: 100 },
      { input: [[]], expected: 0 }
    ]
  },
  {
    id: 'find-max-bug',
    title: 'Find Maximum Bug',
    description: 'Fix the function that should find the maximum value in an array.',
    buggyCode: `function findMax(arr) {\n  let max = 0;\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}`,
    bugs: [
      { line: 2, description: 'Initial max value fails for negative numbers' },
      { line: 3, description: 'Loop may skip first element comparison' }
    ],
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expected: 9 },
      { input: [[-5, -1, -10]], expected: -1 },
      { input: [[42]], expected: 42 }
    ]
  },
  {
    id: 'factorial-bug',
    title: 'Factorial Bug',
    description: 'Fix the function that calculates factorial of a number.',
    buggyCode: `function factorial(n) {\n  if (n === 0) return 0;\n  let result = 1;\n  for (let i = 1; i < n; i++) {\n    result *= i;\n  }\n  return result;\n}`,
    bugs: [
      { line: 2, description: 'Base case returns wrong value' },
      { line: 4, description: 'Loop does not include n in multiplication' }
    ],
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [1], expected: 1 },
      { input: [3], expected: 6 }
    ]
  }
]

const GUESS_OUTPUT_PROBLEMS: OutputProblem[] = [
  {
    id: 'output-1',
    code: `let x = 5;\nlet y = x++;\nconsole.log(y);`,
    options: ['4', '5', '6', 'undefined'],
    correctIndex: 1
  },
  {
    id: 'output-2',
    code: `console.log(typeof null);`,
    options: ['null', 'undefined', 'object', 'boolean'],
    correctIndex: 2
  },
  {
    id: 'output-3',
    code: `const arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);`,
    options: ['3', '4', '5', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-4',
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'undefined', 'Error'],
    correctIndex: 1
  }
]

export const GAME_TIME_LIMITS: Record<GameType, number> = {
  'code-duel': 300,
  'bug-hunter': 180,
  'guess-output': 15
}

export function getTimeLimitForGame(gameType: GameType): number {
  return GAME_TIME_LIMITS[gameType]
}

export function pickRandomProblem(gameType: GameType): LocalProblem {
  if (gameType === 'code-duel') {
    return CODE_DUEL_PROBLEMS[Math.floor(Math.random() * CODE_DUEL_PROBLEMS.length)]
  }

  if (gameType === 'bug-hunter') {
    return BUG_HUNTER_PROBLEMS[Math.floor(Math.random() * BUG_HUNTER_PROBLEMS.length)]
  }

  return GUESS_OUTPUT_PROBLEMS[Math.floor(Math.random() * GUESS_OUTPUT_PROBLEMS.length)]
}

export function calculateScore(maxTimeMs: number, solveTimeMs: number, correct: boolean): number {
  if (!correct) {
    return 0
  }

  const timeBonus = Math.floor((1 - solveTimeMs / maxTimeMs) * 500)
  return 500 + Math.max(0, timeBonus)
}

export function createBotPlan(gameType: GameType): BotPlan {
  const maxTimeMs = getTimeLimitForGame(gameType) * 1000

  const skillMap: Record<GameType, number> = {
    'code-duel': 0.72,
    'bug-hunter': 0.65,
    'guess-output': 0.62
  }

  const speedMap: Record<GameType, [number, number]> = {
    'code-duel': [0.28, 0.75],
    'bug-hunter': [0.35, 0.88],
    'guess-output': [0.2, 0.85]
  }

  const [minFactor, maxFactor] = speedMap[gameType]
  const solveTimeMs = Math.floor(maxTimeMs * (minFactor + Math.random() * (maxFactor - minFactor)))

  return {
    correct: Math.random() < skillMap[gameType],
    timeMs: solveTimeMs
  }
}

export function validateCodeSubmission(code: string, problem: Problem): LocalValidationResult {
  try {
    const userFunction = new Function(`
      ${code}
      return ${getCodeFunctionName(problem.id)};
    `)()

    for (const testCase of problem.testCases) {
      const input = JSON.parse(JSON.stringify(testCase.input))
      const result = userFunction(...input)

      if (!deepEqual(result, testCase.expected)) {
        return {
          correct: false,
          message: `Test failed: expected ${JSON.stringify(testCase.expected)}, got ${JSON.stringify(result)}`
        }
      }
    }

    return { correct: true }
  } catch (error: any) {
    return { correct: false, message: `Error: ${error.message}` }
  }
}

export function validateBugFixSubmission(code: string, problem: BugProblem): LocalValidationResult {
  try {
    const functionMatch = code.match(/function\s+(\w+)/)
    if (!functionMatch) {
      return { correct: false, message: 'Could not find function definition' }
    }

    const functionName = functionMatch[1]
    const userFunction = new Function(`
      ${code}
      return ${functionName};
    `)()

    for (const testCase of problem.testCases) {
      const input = JSON.parse(JSON.stringify(testCase.input))
      const result = userFunction(...input)

      if (!deepEqual(result, testCase.expected)) {
        return {
          correct: false,
          message: `Test failed: expected ${JSON.stringify(testCase.expected)}, got ${JSON.stringify(result)}`
        }
      }
    }

    return { correct: true }
  } catch (error: any) {
    return { correct: false, message: `Error: ${error.message}` }
  }
}

export function validateGuessOutputAnswer(answerIndex: number, problem: OutputProblem): boolean {
  return answerIndex === problem.correctIndex
}

function getCodeFunctionName(problemId: string): string {
  if (problemId === 'two-sum') {
    return 'twoSum'
  }

  if (problemId === 'palindrome-number') {
    return 'isPalindrome'
  }

  if (problemId === 'fizzbuzz') {
    return 'fizzBuzz'
  }

  return 'solution'
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    const sortedA = [...a].sort()
    const sortedB = [...b].sort()
    return sortedA.every((value, index) => deepEqual(value, sortedB[index]))
  }

  if (typeof a === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    return keysA.every((key) => deepEqual(a[key], b[key]))
  }

  return false
}
