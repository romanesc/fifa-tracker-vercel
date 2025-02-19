'use client'
import { useState } from 'react'
import { useAddPlayer } from '@/lib/queries'
import { PulseLoader } from 'react-spinners'

export default function AddPlayerSection() {
  const [username, setUsername] = useState('')
  const addPlayer = useAddPlayer()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      await addPlayer.mutateAsync(username)
      setUsername('') // Clear input on success
    } catch (error) {
      // Error handling is managed by React Query
      console.error('Failed to add player:', error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter player username"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            disabled={addPlayer.isPending}
            required
          />
        </div>
        {addPlayer.error instanceof Error && (
          <p className="text-red-500 text-sm">{addPlayer.error.message}</p>
        )}
        <button
          type="submit"
          disabled={addPlayer.isPending}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {addPlayer.isPending ? (
            <>
              <PulseLoader color="white" size={8} className="mr-2" />
              Adding...
            </>
          ) : (
            'Add Player'
          )}
        </button>
      </form>
    </div>
  )
}