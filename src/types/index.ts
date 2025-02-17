export interface Player {
    id: number
    username: string
    points: number
    created_at: string
  }
  
  export interface Game {
    id: number
    player1_id: number
    player2_id: number
    player1_score: number
    player2_score: number
    player1_team_stars: number
    player2_team_stars: number
    player1_initial_points: number
    player2_initial_points: number
    points_exchanged: number
    created_at: string
  }