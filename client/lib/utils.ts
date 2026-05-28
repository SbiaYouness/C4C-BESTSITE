import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatTimeMs(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const millis = ms % 1000
  return `${seconds}.${millis.toString().padStart(3, '0')}s`
}
