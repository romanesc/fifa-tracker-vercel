'use client'
import { useState } from 'react'
import { usePlayers, useAddGame } from '@/lib/queries'
import { calculatePointsExchange } from '@/utils/gameCalculations'
import type { Player } from '@/types/index'
import type { GameData } from '@/types/games'
import { PulseLoader } from 'react-spinners'

interface FormData {
  player1Id: string
  player2Id: string
  player1Score: string
  player2Score: string
  player1Stars: string
  player2Stars: string
}

const initialFormData: FormData = {
  player1Id: '',
  player2Id: '',
  player1Score: '',
  player2Score: '',
  player1Stars: '',
  player2Stars: ''
}

export default function AddGameSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { data: players = [] } = usePlayers()
  const addGame = useAddGame()
  const [error, setError] = useState<string>('')

// In AddGameSection.tsx

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError('')

  try {
    if (formData.player1Id === formData.player2Id) {
      throw new Error('A player cannot play against themselves')
    }

    const player1 = players.find((p: Player) => p.id.toString() === formData.player1Id)
    const player2 = players.find((p: Player) => p.id.toString() === formData.player2Id)

    if (!player1 || !player2) {
      throw new Error('Players not found')
    }

    const player1Score = parseInt(formData.player1Score)
    const player2Score = parseInt(formData.player2Score)
    const player1Stars = parseFloat(formData.player1Stars)
    const player2Stars = parseFloat(formData.player2Stars)

    let pointsExchanged = 0
    // Only calculate points if the game is not tied
    if (player1Score !== player2Score) {
      if (player1Score > player2Score) {
        pointsExchanged = calculatePointsExchange(
          player1.points,
          player2.points,
          player1Stars,
          player2Stars,
          player1Score,
          player2Score
        )
      } else {
        pointsExchanged = calculatePointsExchange(
          player2.points,
          player1.points,
          player2Stars,
          player1Stars,
          player2Score,
          player1Score
        )
      }
    }

    const gameData: GameData = {
      player1_id: parseInt(formData.player1Id),
      player2_id: parseInt(formData.player2Id),
      player1_score: player1Score,
      player2_score: player2Score,
      player1_team_stars: player1Stars,
      player2_team_stars: player2Stars,
      player1_initial_points: player1.points,
      player2_initial_points: player2.points,
      points_exchanged: pointsExchanged
    }

    await addGame.mutateAsync(gameData)
    setFormData(initialFormData)

  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('An unexpected error occurred')
    }
  }
}

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Record Game</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Player Selects */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 1</label>
            <select
              value={formData.player1Id}
              onChange={(e) => setFormData({ ...formData, player1Id: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Player 1</option>
              {players.map((player: Player) => (
                <option key={player.id} value={player.id}>
                  {player.username}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 2</label>
            <select
              value={formData.player2Id}
              onChange={(e) => setFormData({ ...formData, player2Id: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Player 2</option>
              {players.map((player: Player) => (
                <option key={player.id} value={player.id}>
                  {player.username}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        {/* Scores */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 1 Score</label>
          <input
            type="number"
            min="0"
            value={formData.player1Score}
            onChange={(e) => setFormData({ ...formData, player1Score: e.target.value })}
            placeholder="Score"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 2 Score</label>
          <input
            type="number"
            min="0"
            value={formData.player2Score}
            onChange={(e) => setFormData({ ...formData, player2Score: e.target.value })}
            placeholder="Score"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
  
        {/* Team Stars */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 1 Team Stars</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="5"
            value={formData.player1Stars}
            onChange={(e) => setFormData({ ...formData, player1Stars: e.target.value })}
            placeholder="Team Stars"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Player 2 Team Stars</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="5"
            value={formData.player2Stars}
            onChange={(e) => setFormData({ ...formData, player2Stars: e.target.value })}
            placeholder="Team Stars"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
  
        {error && (
          <div className="col-span-1 sm:col-span-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
  
        <button
          type="submit"
          disabled={addGame.isPending}
          className="col-span-1 sm:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {addGame.isPending ? (
            <>
              <PulseLoader color="white" size={8} className="mr-2" />
              Recording...
            </>
          ) : (
            'Record Game'
          )}
        </button>
      </form>
    </div>
  )
}