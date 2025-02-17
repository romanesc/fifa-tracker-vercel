'use client'
import { usePlayers, useRecentGames } from '@/lib/queries'

export default function RecentGamesSection() {
  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useRecentGames()
  const { data: players = [], isLoading: playersLoading } = usePlayers()

  const isLoading = gamesLoading || playersLoading
  
  const getPlayerName = (id: number) => {
    return players.find(p => p.id === id)?.username || 'Unknown Player'
  }

  if (isLoading) return <div>Loading recent games...</div>
  if (gamesError) return <div className="text-red-500">Error loading games</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Players</th>
              <th className="py-2 text-left">Score</th>
              <th className="py-2 text-left">Team Stars</th>
              <th className="py-2 text-left">Points Exchange</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-b">
                <td className="py-2">
                  {new Date(game.created_at).toLocaleDateString()}
                </td>
                <td className="py-2">
                  {getPlayerName(game.player1_id)} vs {getPlayerName(game.player2_id)}
                </td>
                <td className="py-2">
                  {game.player1_score} - {game.player2_score}
                </td>
                <td className="py-2">
                  {game.player1_team_stars}★ - {game.player2_team_stars}★
                </td>
                <td className="py-2">
                  ±{game.points_exchanged.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}