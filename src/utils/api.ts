import { supabase } from '@/lib/supabase'
import { Player } from '@/types'

export async function getPlayers() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('points', { ascending: false })

  if (error) throw error
  return data as Player[]
}

export async function getRecentGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
  
    if (error) throw error
    return data
  }