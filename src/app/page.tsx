import RulesSection from '../components/rules/RulesSection'
import AddPlayerSection from '../components/player/AddPlayerSection'
import LeaderboardSection from '../components/player/LeaderboardSection'
import AddGameSection from '../components/game/AddGameSection'
import RecentGamesSection from '../components/game/RecentGamesSection'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">FIFA Tracker v2</h1>
      <RulesSection />
      <AddPlayerSection />
      <AddGameSection />
      <LeaderboardSection />
      <RecentGamesSection />
    </main>
  )
}