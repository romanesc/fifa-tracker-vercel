export default function RulesSection() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-2xl font-bold mb-4">Scoring Rules</h2>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-bold mb-2">Base Points</h3>
          <p>Every game starts with a base exchange of 20 points between players.</p>
          
          <h3 className="font-bold mt-4 mb-2">Multipliers</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Rating Difference:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Base multiplier: 1.5x points when a lower-rated player wins</li>
                <li>Additional: +0.1x for every 100 rating points difference</li>
              </ul>
            </li>
            <li>
              <strong>Team Stars:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Base multiplier: 1.3x points when winning with a lower-rated team</li>
                <li>Additional: +0.15x for each star difference</li>
              </ul>
            </li>
            <li>
              <strong>Score Difference:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>+0.1x points for each goal difference above 1</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }