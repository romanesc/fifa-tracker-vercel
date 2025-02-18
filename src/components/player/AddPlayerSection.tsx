'use client'
import { useState } from 'react'
import { useAddPlayer } from '@/lib/queries'

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
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {addPlayer.error instanceof Error && (
          <p className="text-red-500 text-sm">{addPlayer.error.message}</p>
        )}
        <button
          type="submit"
          disabled={addPlayer.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {addPlayer.isPending ? 'Adding...' : 'Add Player'}
        </button>
      </form>
    </div>
  )
}