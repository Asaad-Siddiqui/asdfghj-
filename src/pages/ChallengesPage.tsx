import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ChallengeCard } from '@/components/common/ChallengeCard'
import { Search, Trophy, Filter, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChallengesPage() {
  const { challenges, completions, destinations } = useApp()
  const [search, setSearch] = useState('')
  const [selectedDest, setSelectedDest] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const completedIds = completions
    .filter((c) => c.status === 'completed')
    .map((c) => c.challengeId)

  const inProgressIds = completions
    .filter((c) => c.status === 'in_progress')
    .map((c) => c.challengeId)

  const filtered = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesDest = selectedDest === 'all' || c.destinationId === selectedDest
    const matchesDiff = selectedDifficulty === 'all' || c.difficulty.toLowerCase() === selectedDifficulty
    return matchesSearch && matchesDest && matchesDiff
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* ── Header ── */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800">
            <Trophy className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">
            Responsible Travel Challenges
          </h1>
        </div>
        <p className="text-sm sm:text-base text-sand-600 max-w-3xl leading-relaxed">
          Take part in location-specific eco-missions, photo-verify your actions with timestamps, and earn impact points to redeem perks and badges.
        </p>
      </div>

      {/* ── Status KPI Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Completed Missions', value: completedIds.length, icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
          { label: 'In Progress', value: inProgressIds.length, icon: Zap, color: 'text-amber-700 bg-amber-50 border-amber-200' },
          { label: 'Available Missions', value: challenges.length, icon: Sparkles, color: 'text-blue-700 bg-blue-50 border-blue-200' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-sand-200 p-5 shadow-sm flex items-center gap-4">
            <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0', stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-forest-900">{stat.value}</div>
              <div className="text-xs sm:text-sm font-bold text-sand-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
          <input
            type="text"
            placeholder="Search challenges by keyword, e.g. refill, clean-up, train..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-sand-50 border border-sand-200 rounded-2xl text-sm sm:text-base text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedDest}
            onChange={(e) => setSelectedDest(e.target.value)}
            className="px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-xs sm:text-sm font-bold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
          >
            <option value="all">📍 All Destinations</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>📍 {d.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all border cursor-pointer',
                  selectedDifficulty === d
                    ? 'bg-forest-800 text-white border-forest-800 shadow-2xs'
                    : 'bg-sand-50 border-sand-200 text-sand-700 hover:bg-sand-100'
                )}
              >
                {d === 'all' ? 'All Difficulties' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Challenges List ── */}
      <div className="space-y-4">
        {filtered.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            id={challenge.id}
            title={challenge.title}
            description={challenge.description}
            icon={challenge.icon}
            difficulty={challenge.difficulty}
            points={challenge.points}
            estimatedMinutes={challenge.estimatedMinutes}
            isCompleted={completedIds.includes(challenge.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 shadow-sm">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-xl font-bold text-forest-900 mb-1">No challenges found</h3>
          <p className="text-sm text-sand-600">Try adjusting your filters or destination selection.</p>
        </div>
      )}
    </div>
  )
}
