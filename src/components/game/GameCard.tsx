'use client'
import { Game } from '@/types/index'
import { format } from 'date-fns'
import { useState } from 'react'

interface GameCardProps {
  game: Game
  getPlayerName: (id: number) => string
}

interface CalculationDetail {
  type: 'rating' | 'stars' | 'score';
  description: string;
  difference: string | number;
  multiplier: string;
}

interface CalculationDetails {
  base: number;
  ratingMultiplier: number;
  starMultiplier: number;
  scoreMultiplier: number;
  calculations: CalculationDetail[];
  message?: string;
}

export default function GameCard({ game, getPlayerName }: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const isPlayer1Winner = game.player1_score > game.player2_score
  const isPlayer2Winner = game.player2_score > game.player1_score

  const getCalculationDetails = (): CalculationDetails => {
    if (game.player1_score === game.player2_score) {
      return {
        base: 20,
        ratingMultiplier: 1,
        starMultiplier: 1,
        scoreMultiplier: 1,
        calculations: [],
        message: "Tied game - No points exchanged"
      }
    }

    const winner = isPlayer1Winner ? 
      { 
        name: getPlayerName(game.player1_id),
        points: game.player1_initial_points, 
        stars: game.player1_team_stars, 
        score: game.player1_score 
      } :
      { 
        name: getPlayerName(game.player2_id),
        points: game.player2_initial_points, 
        stars: game.player2_team_stars, 
        score: game.player2_score 
      }

    const loser = isPlayer1Winner ?
      { 
        name: getPlayerName(game.player2_id),
        points: game.player2_initial_points, 
        stars: game.player2_team_stars, 
        score: game.player2_score 
      } :
      { 
        name: getPlayerName(game.player1_id),
        points: game.player1_initial_points, 
        stars: game.player1_team_stars, 
        score: game.player1_score 
      }

    const details: CalculationDetails = {
      base: 20,
      ratingMultiplier: 1,
      starMultiplier: 1,
      scoreMultiplier: 1,
      calculations: []
    }

    // Rating difference multiplier
    if (winner.points < loser.points) {
      const ratingDiff = loser.points - winner.points
      details.ratingMultiplier = 1.5 + (Math.floor(ratingDiff / 100) * 0.1)
      details.calculations.push({
        type: 'rating',
        description: `${winner.name} (${winner.points}) beat higher-rated ${loser.name} (${loser.points})`,
        difference: ratingDiff,
        multiplier: details.ratingMultiplier.toFixed(2)
      })
    }

    // Team stars multiplier
    if (winner.stars < loser.stars) {
      const starDiff = loser.stars - winner.stars
      details.starMultiplier = 1.3 + (starDiff * 0.15)
      details.calculations.push({
        type: 'stars',
        description: `Won with lower-rated team`,
        difference: `${winner.stars}★ vs ${loser.stars}★`,
        multiplier: details.starMultiplier.toFixed(2)
      })
    }

    // Score difference multiplier
    const goalDiff = winner.score - loser.score
    if (goalDiff > 1) {
      const extraGoals = goalDiff - 1
      details.scoreMultiplier = 1 + (extraGoals * 0.1)
      details.calculations.push({
        type: 'score',
        description: `Goal difference bonus`,
        difference: `+${extraGoals} goals over minimum`,
        multiplier: details.scoreMultiplier.toFixed(2)
      })
    }

    return details
  }

  
  const details = getCalculationDetails()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
          {format(new Date(game.created_at), 'MMM d, yyyy - HH:mm')}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            ±{game.points_exchanged.toFixed(2)} points
          </span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {showDetails ? '▲' : '▼'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 items-center gap-2">
        <div className={`text-right ${isPlayer1Winner ? 'font-bold' : ''}`}>
          <div className="text-lg dark:text-white">
            {getPlayerName(game.player1_id)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {game.player1_team_stars}★
          </div>
        </div>

        <div className="text-center">
          <div className="text-xl font-bold dark:text-white">
            {game.player1_score} - {game.player2_score}
          </div>
        </div>

        <div className={`text-left ${isPlayer2Winner ? 'font-bold' : ''}`}>
          <div className="text-lg dark:text-white">
            {getPlayerName(game.player2_id)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {game.player2_team_stars}★
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="text-gray-600 dark:text-gray-300 space-y-2">
            {details.message ? (
              <p className="font-medium">{details.message}</p>
            ) : (
              <>
                <div className="font-medium text-gray-900 dark:text-white mb-3">
                  Points Calculation
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2">
                  <div className="flex justify-between">
                    <span>Base points:</span>
                    <span className="font-medium">{details.base}</span>
                  </div>

                  {details.calculations.map((calc, index) => (
                    <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>{calc.description}</span>
                        <span className="font-medium">{calc.multiplier}x</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {calc.difference}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-3">
                    <div className="flex justify-between font-medium text-gray-900 dark:text-white">
                      <span>Final calculation:</span>
                      <span>
                        {details.base} × {details.calculations
                          .map(c => c.multiplier)
                          .join(' × ') || '1'} = {game.points_exchanged.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}