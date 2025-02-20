'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Game, Player } from '@/types/index'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Link from 'next/link'

export default function PlayerPage({ params }: { params: { id: string } }) {
  const playerId = parseInt(params.id) // Use params.id instead of paramId
  const [player, setPlayer] = useState<Player | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPlayerData() {
      try {
        // Load player
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('*')
          .eq('id', params.id)
          .single()
  
        if (playerError) throw playerError
        setPlayer(playerData)
  
        // Load all players for opponent names
        const { data: allPlayers, error: allPlayersError } = await supabase
          .from('players')
          .select('*')
  
        if (allPlayersError) throw allPlayersError
        setPlayers(allPlayers)
  
        // Load games
        const { data: gamesData, error: gamesError } = await supabase
          .from('games')
          .select('*')
          .or(`player1_id.eq.${params.id},player2_id.eq.${params.id}`)
          .order('created_at', { ascending: false })
  
        if (gamesError) throw gamesError
        setGames(gamesData)
  
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  
    loadPlayerData()
  }, [params.id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>
  if (!player) return <div>Player not found</div>

  // Calculate stats
  const stats = {
    totalGames: games.length,
    wins: games.filter(game => 
      (game.player1_id === player.id && game.player1_score > game.player2_score) ||
      (game.player2_id === player.id && game.player2_score > game.player1_score)
    ).length,
    goalsScored: games.reduce((total, game) => 
      total + (game.player1_id === player.id ? game.player1_score : game.player2_score)
    , 0),
    goalsConceded: games.reduce((total, game) => 
      total + (game.player1_id === player.id ? game.player2_score : game.player1_score)
    , 0),
    averageStars: games.reduce((total, game) => 
      total + (game.player1_id === player.id ? game.player1_team_stars : game.player2_team_stars)
    , 0) / (games.length || 1)
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">{player.username}</h1>
        <p className="text-xl mb-6 dark:text-gray-300">Current Rating: {player.points.toFixed(2)}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold dark:text-white">
              {((stats.wins / stats.totalGames) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Win Rate ({stats.wins}/{stats.totalGames})
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold dark:text-white">
              {(stats.goalsScored / stats.totalGames).toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Goals per Game
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold dark:text-white">
              {(stats.goalsConceded / stats.totalGames).toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Goals Conceded per Game
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <div className="text-2xl font-bold dark:text-white">
              {stats.averageStars.toFixed(1)}★
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Average Team Stars
            </div>
          </div>
        </div>
      </div>

      {/* Compare with Players section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Compare with Player</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 text-left dark:text-gray-300">Player</th>
                <th className="py-2 text-left dark:text-gray-300">Rating</th>
              </tr>
            </thead>
            <tbody>
              {players
                .filter(p => p.id !== player.id)
                .map(otherPlayer => (
                  <tr key={otherPlayer.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 dark:text-gray-300">
                      <Link
                        href={`/head-to-head/${player.id}/${otherPlayer.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {otherPlayer.username}
                      </Link>
                    </td>
                    <td className="py-2 dark:text-gray-300">
                      {otherPlayer.points.toFixed(2)}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Recent Games</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 text-left dark:text-gray-300">Date</th>
                <th className="py-2 text-left dark:text-gray-300">Opponent</th>
                <th className="py-2 text-left dark:text-gray-300">Result</th>
                <th className="py-2 text-left dark:text-gray-300">Team Stars</th>
                <th className="py-2 text-left dark:text-gray-300">Points</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                const isPlayer1 = game.player1_id === player.id
                const playerScore = isPlayer1 ? game.player1_score : game.player2_score
                const opponentScore = isPlayer1 ? game.player2_score : game.player1_score
                const playerStars = isPlayer1 ? game.player1_team_stars : game.player2_team_stars
                const opponentStars = isPlayer1 ? game.player2_team_stars : game.player1_team_stars
                const opponentId = isPlayer1 ? game.player2_id : game.player1_id
                const won = isPlayer1 ? game.player1_score > game.player2_score : game.player2_score > game.player1_score
                const pointsChange = won ? game.points_exchanged : -game.points_exchanged

                return (
                  <tr key={game.id} className="border-b dark:border-gray-700">
                    <td className="py-2 dark:text-gray-300">
                      {new Date(game.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 dark:text-gray-300">
                      <Link 
                        href={`/player/${opponentId}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {players.find(p => p.id === opponentId)?.username}
                      </Link>
                    </td>
                    <td className="py-2 dark:text-gray-300">
                      {playerScore} - {opponentScore}
                    </td>
                    <td className="py-2 dark:text-gray-300">
                      {playerStars}★ - {opponentStars}★
                    </td>
                    <td className={`py-2 ${pointsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {pointsChange > 0 ? '+' : ''}{pointsChange.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}