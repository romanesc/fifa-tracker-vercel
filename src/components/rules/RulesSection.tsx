export default function RulesSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Scoring Rules</h2>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded space-y-4">
        <div>
          <h3 className="font-bold mb-2 dark:text-white">Base Points</h3>
          <p className="dark:text-gray-300 text-sm sm:text-base">
            Every game starts with a base exchange of 20 points between players.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold mb-2 dark:text-white">Multipliers</h3>
          <ul className="space-y-4">
            <li className="dark:text-gray-300">
              <div className="font-medium dark:text-white mb-1">Rating Difference:</div>
              <ul className="list-disc pl-4 space-y-1 text-sm sm:text-base">
                <li>Base multiplier: 1.5x points when a lower-rated player wins</li>
                <li>Additional: +0.1x for every 100 rating points difference</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm italic">
                  Example: 1000-rated player beats 1300-rated player = 1.5 + (300/100 * 0.1) = 1.8x points
                </li>
              </ul>
            </li>

            <li className="dark:text-gray-300">
              <div className="font-medium dark:text-white mb-1">Team Stars:</div>
              <ul className="list-disc pl-4 space-y-1 text-sm sm:text-base">
                <li>Base multiplier: 1.3x points when winning with a lower-rated team</li>
                <li>Additional: +0.15x for each star difference</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm italic">
                  Example: Winning with 3★ vs 5★ team = 1.3 + (2 * 0.15) = 1.6x points
                </li>
              </ul>
            </li>

            <li className="dark:text-gray-300">
              <div className="font-medium dark:text-white mb-1">Score Difference:</div>
              <ul className="list-disc pl-4 space-y-1 text-sm sm:text-base">
                <li>+0.1x points for each goal difference above 1</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm italic">
                  Example: Winning 3-0 = 2 extra goals = +0.2x points
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}