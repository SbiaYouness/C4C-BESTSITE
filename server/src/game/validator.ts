// Code validator for Code Duel
export function validateCode(code: string, problem: any): { correct: boolean; message?: string } {
  try {
    // Create a sandboxed function from user code
    const userFunction = new Function(`
      ${code}
      return ${problem.id === 'two-sum' ? 'twoSum' : 
               problem.id === 'reverse-string' ? 'reverseString' :
               problem.id === 'palindrome-number' ? 'isPalindrome' :
               problem.id === 'fizzbuzz' ? 'fizzBuzz' : 'solution'};
    `)()

    // Run against all test cases
    for (const testCase of problem.testCases) {
      const input = JSON.parse(JSON.stringify(testCase.input)) // Deep copy
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

// Validator for Bug Hunter
export function validateBugFix(code: string, problem: any): { correct: boolean; message?: string } {
  try {
    // Extract function from code
    const functionMatch = code.match(/function\s+(\w+)/)
    if (!functionMatch) {
      return { correct: false, message: 'Could not find function definition' }
    }
    
    const functionName = functionMatch[1]
    const userFunction = new Function(`
      ${code}
      return ${functionName};
    `)()

    // Run test cases
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

// Validator for Guess the Output
export function validateAnswer(answerIndex: number, problem: any): boolean {
  return answerIndex === problem.correctIndex
}

// Deep equality check
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  
  if (typeof a !== typeof b) return false
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    // For arrays like [0,1] and [1,0] that should match in any order
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()
    return sortedA.every((val, idx) => deepEqual(val, sortedB[idx]))
  }
  
  if (typeof a === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every(key => deepEqual(a[key], b[key]))
  }
  
  return false
}
