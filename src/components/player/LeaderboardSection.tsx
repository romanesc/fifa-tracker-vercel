'use client'
import { usePlayers } from '@/lib/queries'

export default function LeaderboardSection() {
  const { data: players, isLoading, error } = usePlayers()

  if (isLoading) return <div>Loading leaderboard...</div>
  if (error) return <div className="text-red-500">Error loading leaderboard</div>
  if (!players) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Rank</th>
              <th className="py-2 text-left">Player</th>
              <th className="py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{player.username}</td>
                <td className="py-2">{player.points.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}