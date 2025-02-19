export default function RulesSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Scoring Rules</h2>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
        <h3 className="font-bold mb-2 dark:text-white">Base Points</h3>
        <p className="dark:text-gray-300">Every game starts with a base exchange of 20 points between players.</p>
        
        <h3 className="font-bold mt-4 mb-2 dark:text-white">Multipliers</h3>
        <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
          <li>
            <strong className="dark:text-white">Rating Difference:</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>Base multiplier: 1.5x points when a lower-rated player wins</li>
              <li>Additional: +0.1x for every 100 rating points difference</li>
            </ul>
          </li>
          {/* Rest of the list items with same dark mode classes */}
        </ul>
      </div>
    </div>
  )
}