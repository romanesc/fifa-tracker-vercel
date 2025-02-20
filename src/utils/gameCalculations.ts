export function calculatePointsExchange(
  winnerPoints: number,  // Current points of winning player
  loserPoints: number,   // Current points of losing player
  winnerStars: number,   // Team stars of winning player
  loserStars: number,    // Team stars of losing player
  winnerScore: number,   // Goals scored by winner
  loserScore: number     // Goals scored by loser
): number {
  // Base points exchange
  let points = 20;
  
  // 1. Rating Difference Multiplier
  // Base 1.5x when lower-rated player wins
  if (winnerPoints < loserPoints) {
    let ratingDiff = loserPoints - winnerPoints;
    let ratingMultiplier = 1.5 + (Math.floor(ratingDiff / 100) * 0.1);
    points *= ratingMultiplier;
  }

  // 2. Team Stars Multiplier
  // Base 1.3x when winning with lower-rated team
  if (winnerStars < loserStars) {
    let starDiff = loserStars - winnerStars;
    let starMultiplier = 1.3 + (starDiff * 0.15);
    points *= starMultiplier;
  }

  // 3. Score Difference Multiplier
  // +0.1x for each goal difference above 1
  let goalDiff = winnerScore - loserScore;
  if (goalDiff > 1) {
    let extraGoals = goalDiff - 1;
    let scoreMultiplier = 1 + (extraGoals * 0.1);
    points *= scoreMultiplier;
  }

  return Math.round(points * 100) / 100; // Round to 2 decimal places
}