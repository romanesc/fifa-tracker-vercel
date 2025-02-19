'use client'
import { usePlayers, useRecentGames } from '@/lib/queries'
import LoadingSpinner from '../ui/LoadingSpinner'
import GameCard from './GameCard'

export default function RecentGamesSection() {
  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useRecentGames()
  const { data: players = [], isLoading: playersLoading } = usePlayers()

  const isLoading = gamesLoading || playersLoading
  
  const getPlayerName = (id: number) => {
    return players.find(p => p.id === id)?.username || 'Unknown Player'
  }

  if (isLoading) return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Recent Games</h2>
      <LoadingSpinner />
    </div>
  )

  if (gamesError) return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Recent Games</h2>
      <div className="text-red-500 text-center">Error loading games</div>
    </div>
  )

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Recent Games</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            getPlayerName={getPlayerName}
          />
        ))}
      </div>
    </div>
  )
}