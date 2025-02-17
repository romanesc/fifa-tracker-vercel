export function calculatePointsExchange(
    winnerPoints: number,
    loserPoints: number,
    winnerStars: number,
    loserStars: number,
    winnerScore: number,
    loserScore: number
  ): number {
    // Base exchange rate
    const basePoints = 20
    
    // Rating difference multiplier
    const ratingDiff = Math.abs(winnerPoints - loserPoints)
    let ratingMultiplier = 1.0
    if (winnerPoints < loserPoints) {
      ratingMultiplier = 1.5 + (ratingDiff / 100) * 0.1
    }
    
    // Star difference multiplier
    const starDiff = winnerStars - loserStars
    let starMultiplier = 1.0
    if (starDiff < 0) {
      starMultiplier = 1.3 + Math.abs(starDiff) * 0.15
    }
    
    // Score difference multiplier
    const scoreDiff = winnerScore - loserScore
    const scoreMultiplier = 1.0 + (scoreDiff - 1) * 0.1
    
    return Number((basePoints * ratingMultiplier * starMultiplier * scoreMultiplier).toFixed(2))
  }