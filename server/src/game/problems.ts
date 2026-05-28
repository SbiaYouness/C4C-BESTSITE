// Code Duel Problems
export const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
      { input: [[1,2,3,4,5], 9], expected: [3,4] }
    ],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    starterCode: `function reverseString(s) {
  // Your code here
  
}`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
      { input: [["a"]], expected: ["a"] },
      { input: [["a","b"]], expected: ["b","a"] }
    ],
    solution: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.
For example, 121 is a palindrome while 123 is not.`,
    examples: [
      { input: 'x = 121', output: 'true' },
      { input: 'x = -121', output: 'false' },
      { input: 'x = 10', output: 'false' }
    ],
    starterCode: `function isPalindrome(x) {
  // Your code here
  
}`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [12321], expected: true },
      { input: [0], expected: true }
    ],
    solution: `function isPalindrome(x) {
  if (x < 0) return false;
  const str = x.toString();
  return str === str.split('').reverse().join('');
}`
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: `Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.`,
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ],
    starterCode: `function fizzBuzz(n) {
  // Your code here
  
}`,
    testCases: [
      { input: [3], expected: ["1","2","Fizz"] },
      { input: [5], expected: ["1","2","Fizz","4","Buzz"] },
      { input: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] }
    ],
    solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i.toString());
  }
  return result;
}`
  }
]

// Bug Hunter Problems
export const bugProblems = [
  {
    id: 'sum-array-bug',
    title: 'Sum Array Bug',
    description: 'Fix the function that should return the sum of all numbers in an array.',
    buggyCode: `function sumArray(arr) {
  let sum = 1;  // Bug 1: Should start at 0
  for (let i = 0; i <= arr.length; i++) {  // Bug 2: Should be < not <=
    sum += arr[i];
  }
  return sum;
}`,
    bugs: [
      { line: 2, description: 'Initial sum value is wrong' },
      { line: 3, description: 'Loop condition causes out of bounds' }
    ],
    correctCode: `function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    testCases: [
      { input: [[1,2,3]], expected: 6 },
      { input: [[10,20,30,40]], expected: 100 },
      { input: [[]], expected: 0 }
    ]
  },
  {
    id: 'find-max-bug',
    title: 'Find Maximum Bug',
    description: 'Fix the function that should find the maximum value in an array.',
    buggyCode: `function findMax(arr) {
  let max = 0;  // Bug 1: Should be -Infinity or arr[0]
  for (let i = 1; i < arr.length; i++) {  // Bug 2: Should start from 0 if using -Infinity
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    bugs: [
      { line: 2, description: 'Initial max value fails for negative numbers' },
      { line: 3, description: 'Loop may skip first element comparison' }
    ],
    correctCode: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    testCases: [
      { input: [[1,5,3,9,2]], expected: 9 },
      { input: [[-5,-1,-10]], expected: -1 },
      { input: [[42]], expected: 42 }
    ]
  },
  {
    id: 'factorial-bug',
    title: 'Factorial Bug',
    description: 'Fix the function that calculates factorial of a number.',
    buggyCode: `function factorial(n) {
  if (n === 0) return 0;  // Bug 1: factorial(0) should be 1
  let result = 1;
  for (let i = 1; i < n; i++) {  // Bug 2: Should be <= n
    result *= i;
  }
  return result;
}`,
    bugs: [
      { line: 2, description: 'Base case returns wrong value' },
      { line: 4, description: 'Loop does not include n in multiplication' }
    ],
    correctCode: `function factorial(n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}`,
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [1], expected: 1 },
      { input: [3], expected: 6 }
    ]
  }
]

// Guess the Output Problems
export const outputProblems = [
  {
    id: 'output-1',
    code: `let x = 5;
let y = x++;
console.log(y);`,
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
    code: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
    options: ['3', '4', '5', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-4',
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'undefined', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-5',
    code: `let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a.length);`,
    options: ['3', '4', 'undefined', 'Error'],
    correctIndex: 1
  },
  {
    id: 'output-6',
    code: `console.log("5" - 3);`,
    options: ['2', '"2"', '"53"', 'NaN'],
    correctIndex: 0
  },
  {
    id: 'output-7',
    code: `console.log("5" + 3);`,
    options: ['8', '"8"', '"53"', 'NaN'],
    correctIndex: 2
  },
  {
    id: 'output-8',
    code: `const x = [1, 2, 3].map(n => n * 2);
console.log(x[1]);`,
    options: ['2', '4', '6', 'undefined'],
    correctIndex: 1
  },
  {
    id: 'output-9',
    code: `let x = 10;
if (true) {
  let x = 20;
}
console.log(x);`,
    options: ['10', '20', 'undefined', 'Error'],
    correctIndex: 0
  },
  {
    id: 'output-10',
    code: `const obj = { a: 1 };
Object.freeze(obj);
obj.b = 2;
console.log(obj.b);`,
    options: ['2', 'undefined', 'null', 'Error'],
    correctIndex: 1
  }
]
