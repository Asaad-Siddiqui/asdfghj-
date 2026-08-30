import { creators, campaigns } from '@/data/mock-data'
import { useApp } from '@/context/AppContext'
import { Users, Target, ChevronRight, Sparkles, Award, Compass, HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CreatorsPage() {
  const { destinations } = useApp()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">
            Responsible Travel Creators & Multipliers
          </h1>
        </div>
        <p className="text-sm sm:text-base text-sand-600 max-w-3xl leading-relaxed">
          Certified creators and cultural ambassadors championing ethical exploration, leave-no-trace ethics, and indigenous heritage support.
        </p>
      </div>

      {/* Creators Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-forest-900">Featured Eco Ambassadors</h2>
          <span className="text-xs font-bold text-sand-500">Verified Influencers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white rounded-3xl border border-sand-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  {creator.avatar ? (
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-forest-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                      {creator.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-forest-900 text-base">{creator.name}</h3>
                    <p className="text-xs font-semibold text-emerald-700">{creator.handle}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-sand-700 leading-relaxed mb-4">{creator.bio}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-sand-100 text-xs font-bold text-sand-600">
                <span className="flex items-center gap-1.5 bg-sand-50 px-3 py-1.5 rounded-xl">
                  <Users className="w-4 h-4 text-emerald-600" />
                  {(creator.followers / 1000).toFixed(1)}k followers
                </span>
                <span className="flex items-center gap-1.5 bg-sand-50 px-3 py-1.5 rounded-xl">
                  <Target className="w-4 h-4 text-amber-600" />
                  {creator.campaigns} campaigns
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-forest-900">Active Community Campaigns</h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Open for Participation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => {
            const creator = creators.find((c) => c.id === campaign.creatorId)
            const destination = destinations.find((d) => d.id === campaign.destinationId)
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-gradient-to-r from-forest-800 to-forest-950 relative overflow-hidden">
                    {campaign.coverImageUrl && (
                      <img
                        src={campaign.coverImageUrl}
                        alt={campaign.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-emerald-500 text-forest-950 text-xs font-black rounded-full uppercase tracking-wider shadow-sm">
                        {campaign.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs text-emerald-300 font-semibold mb-0.5">
                        Led by {creator?.name} • 📍 {destination?.name}
                      </p>
                      <h3 className="text-xl font-black">{campaign.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-sand-700 leading-relaxed mb-4">{campaign.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-sand-100 text-xs font-bold text-sand-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-emerald-600" />
                          {campaign.participants} Travelers Joined
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Target className="w-4 h-4 text-amber-600" />
                          {campaign.challengeCount} Quests
                        </span>
                      </div>

                      <button
                        onClick={() => alert(`Joined ${campaign.title}! Check your active challenges.`)}
                        className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Join Quest <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
