import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPlayers, getRecentGames } from '@/utils/api'
import { supabase } from './supabase'
import { Player } from '@/types'

export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: getPlayers
  })
}

export function useRecentGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: getRecentGames
  })
}

export function useAddPlayer() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (username: string) => {
      const { error } = await supabase
        .from('players')
        .insert([{ username, points: 1200 }])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
    }
  })
}

export function useAddGame() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (gameData: any) => {
      const { error } = await supabase
        .from('games')
        .insert([gameData])
      if (error) throw error
      
      // Update player points
      if (gameData.player1_score > gameData.player2_score) {
        await supabase
          .from('players')
          .update({ points: gameData.player1_initial_points + gameData.points_exchanged })
          .eq('id', gameData.player1_id)

        await supabase
          .from('players')
          .update({ points: gameData.player2_initial_points - gameData.points_exchanged })
          .eq('id', gameData.player2_id)
      } else if (gameData.player2_score > gameData.player1_score) {
        await supabase
          .from('players')
          .update({ points: gameData.player1_initial_points - gameData.points_exchanged })
          .eq('id', gameData.player1_id)

        await supabase
          .from('players')
          .update({ points: gameData.player2_initial_points + gameData.points_exchanged })
          .eq('id', gameData.player2_id)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
      queryClient.invalidateQueries({ queryKey: ['games'] })
    }
  })
}