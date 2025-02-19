'use client'
import { Game } from '@/types/index'
import { format } from 'date-fns'

interface GameCardProps {
  game: Game
  getPlayerName: (id: number) => string
}

export default function GameCard({ game, getPlayerName }: GameCardProps) {
  const isPlayer1Winner = game.player1_score > game.player2_score
  const isPlayer2Winner = game.player2_score > game.player1_score

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
          {format(new Date(game.created_at), 'MMM d, yyyy - HH:mm')}
        </span>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          ±{game.points_exchanged.toFixed(2)} points
        </span>
      </div>
      
      <div className="grid grid-cols-3 items-center gap-2">
        {/* Player 1 */}
        <div className={`text-right ${isPlayer1Winner ? 'font-bold' : ''}`}>
          <div className="text-lg dark:text-white">
            {getPlayerName(game.player1_id)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {game.player1_team_stars}★
          </div>
        </div>

        {/* Score */}
        <div className="text-center">
          <div className="text-xl font-bold dark:text-white">
            {game.player1_score} - {game.player2_score}
          </div>
        </div>

        {/* Player 2 */}
        <div className={`text-left ${isPlayer2Winner ? 'font-bold' : ''}`}>
          <div className="text-lg dark:text-white">
            {getPlayerName(game.player2_id)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {game.player2_team_stars}★
          </div>
        </div>
      </div>
    </div>
  )
}