'use client'
import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  )
}