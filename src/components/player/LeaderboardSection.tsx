'use client'
import { usePlayers } from '@/lib/queries'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function LeaderboardSection() {
  const { data: players, isLoading, error } = usePlayers()

  if (isLoading) return <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
    <LoadingSpinner />
  </div>
  
  if (error) return <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
    <div className="text-red-500 text-center">Error loading leaderboard</div>
  </div>

  if (!players) return null

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Leaderboard</h2>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2 px-4 sm:px-2 text-left dark:text-gray-300">Rank</th>
              <th className="py-2 px-4 sm:px-2 text-left dark:text-gray-300">Player</th>
              <th className="py-2 px-4 sm:px-2 text-left dark:text-gray-300">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id} className="border-b dark:border-gray-700">
                <td className="py-2 px-4 sm:px-2 dark:text-gray-300">{index + 1}</td>
                <td className="py-2 px-4 sm:px-2 dark:text-gray-300">{player.username}</td>
                <td className="py-2 px-4 sm:px-2 dark:text-gray-300">{player.points.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}