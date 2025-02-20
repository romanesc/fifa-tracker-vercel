'use client';

import { useEffect, useState } from 'react'  // Remove 'use' from import
import { supabase } from '@/lib/supabase'
import { Game, Player } from '@/types/index'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Link from 'next/link'
import { format } from 'date-fns'

export default function HeadToHeadPage({ 
  params 
}: { 
  params: { player1: string; player2: string } 
}) {
  // Remove the use() call and directly use params
  const [player1, setPlayer1] = useState<Player | null>(null)
  const [player2, setPlayer2] = useState<Player | null>(null)
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        // Load both players
        const [player1Response, player2Response] = await Promise.all([
          supabase.from('players').select('*').eq('id', params.player1).single(),
          supabase.from('players').select('*').eq('id', params.player2).single()
        ])

        if (player1Response.error) throw player1Response.error
        if (player2Response.error) throw player2Response.error

        setPlayer1(player1Response.data)
        setPlayer2(player2Response.data)

        // Load head-to-head games
        const { data: gamesData, error: gamesError } = await supabase
          .from('games')
          .select('*')
          .or(
            `and(player1_id.eq.${params.player1},player2_id.eq.${params.player2}),` +
            `and(player1_id.eq.${params.player2},player2_id.eq.${params.player1})`
          )
          .order('created_at', { ascending: false })

        if (gamesError) throw gamesError
        setGames(gamesData)

      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.player1, params.player2])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>
  if (!player1 || !player2) return <div>Players not found</div>

  // Calculate head-to-head stats
  const stats = {
    totalGames: games.length,
    player1Wins: games.filter(game => 
      (game.player1_id === player1.id && game.player1_score > game.player2_score) ||
      (game.player2_id === player1.id && game.player2_score > game.player1_score)
    ).length,
    player1Goals: games.reduce((total, game) => 
      total + (game.player1_id === player1.id ? game.player1_score : game.player2_score)
    , 0),
    player2Goals: games.reduce((total, game) => 
      total + (game.player1_id === player2.id ? game.player1_score : game.player2_score)
    , 0),
    avgStarsPlayer1: games.reduce((total, game) => 
      total + (game.player1_id === player1.id ? game.player1_team_stars : game.player2_team_stars)
    , 0) / (games.length || 1),
    avgStarsPlayer2: games.reduce((total, game) => 
      total + (game.player1_id === player2.id ? game.player1_team_stars : game.player2_team_stars)
    , 0) / (games.length || 1)
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Link href="/">
        <div className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </div>
      </Link>

      {/* Rest of the JSX remains the same... */}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white text-center">
          {player1.username} vs {player2.username}
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold dark:text-white">{player1.username}</div>
            <div className="text-gray-600 dark:text-gray-400">{player1.points.toFixed(2)} points</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold dark:text-white">
              {stats.player1Wins} - {stats.totalGames - stats.player1Wins}
            </div>
            <div className="text-gray-600 dark:text-gray-400">All-time record</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold dark:text-white">{player2.username}</div>
            <div className="text-gray-600 dark:text-gray-400">{player2.points.toFixed(2)} points</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-center">
            <div className="text-xl font-bold dark:text-white">
              {(stats.player1Goals / stats.totalGames).toFixed(1)} - {(stats.player2Goals / stats.totalGames).toFixed(1)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Average Goals per Game</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-center">
            <div className="text-xl font-bold dark:text-white">
              {stats.avgStarsPlayer1.toFixed(1)}★ - {stats.avgStarsPlayer2.toFixed(1)}★
            </div>
            <div className="text-gray-600 dark:text-gray-400">Average Team Stars</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Match History</h2>
        <div className="space-y-4">
          {games.map(game => {
            const isPlayer1First = game.player1_id === player1.id
            const score1 = isPlayer1First ? game.player1_score : game.player2_score
            const score2 = isPlayer1First ? game.player2_score : game.player1_score
            const stars1 = isPlayer1First ? game.player1_team_stars : game.player2_team_stars
            const stars2 = isPlayer1First ? game.player2_team_stars : game.player1_team_stars

            return (
              <div key={game.id} className="border dark:border-gray-700 rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(game.created_at), 'MMM d, yyyy')}
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    ±{game.points_exchanged.toFixed(2)} points
                  </span>
                </div>
                <div className="grid grid-cols-3 text-center">
                  <div className="dark:text-white">
                    <div className="font-medium">{score1}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stars1}★</div>
                  </div>
                  <div className="dark:text-white">vs</div>
                  <div className="dark:text-white">
                    <div className="font-medium">{score2}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stars2}★</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}