import RulesSection from '@/components/rules/RulesSection'
import AddPlayerSection from '@/components/player/AddPlayerSection'
import LeaderboardSection from '@/components/player/LeaderboardSection'
import AddGameSection from '@/components/game/AddGameSection'
import RecentGamesSection from '@/components/game/RecentGamesSection'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">FIFA Tracker</h1>
      <RulesSection />
      <AddPlayerSection />
      <AddGameSection />
      <LeaderboardSection />
      <RecentGamesSection />
    </main>
  )
}