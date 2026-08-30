import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import {
  Sparkles,
  MapPin,
  Zap,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  Trophy,
  AlertTriangle,
  Heart,
  MessageCircle,
  Clock,
  ChevronRight,
  Leaf,
  PlusCircle,
} from 'lucide-react'
import { DestinationCard } from '@/components/common/DestinationCard'
import { ChallengeCard } from '@/components/common/ChallengeCard'
import { SustainabilityScore } from '@/components/common/SustainabilityScore'
import { socialPosts } from '@/data/mock-data'
import { cn } from '@/lib/utils'

export function HomePage() {
  const { user, destinations, challenges, completions } = useApp()

  const recommendedDestination = destinations[0]
  const uncompletedChallenges = challenges.filter(
    (c) => !completions.some((comp) => comp.challengeId === c.id && comp.status === 'completed')
  )
  const recommendedChallenge = uncompletedChallenges[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* ── Welcome Header Banner ── */}
      <div className="relative bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-white/10 animate-fade-in">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-lg shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user.displayName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold mb-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Level 3 • Conscious Explorer
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, {user.displayName.split(' ')[0]}! 👋
              </h1>
              <p className="text-forest-200/90 text-sm sm:text-base mt-1">
                You have accumulated <span className="font-extrabold text-emerald-300">{user.impactPoints} impact points</span>. Where are we heading next?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/trip-planner"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              Plan Next Trip
            </Link>
            <Link
              to="/reports/new"
              className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/15 transition-all flex items-center gap-2 shrink-0"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Report Issue
            </Link>
          </div>
        </div>
      </div>

      {/* ── Impact Quick Stats Grid ── */}
      <section className="animate-slide-up">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Impact Points', value: user.impactPoints, sub: 'Top 5% in community', icon: Zap, gradient: 'from-forest-600 to-emerald-700', bg: 'bg-emerald-50', text: 'text-emerald-700' },
            { label: 'Challenges Completed', value: user.challengesCompleted, sub: '8 verified proof', icon: Trophy, gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-700' },
            { label: 'Destinations Visited', value: user.destinationsVisited, sub: 'Eco hubs explored', icon: MapPin, gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'CO₂ Avoided', value: `${user.co2Avoided} kg`, sub: 'Low-impact transit', icon: Leaf, gradient: 'from-green-600 to-teal-700', bg: 'bg-green-50', text: 'text-green-700' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-sand-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', stat.bg, stat.text)}>
                  Active
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">{stat.value}</div>
                <div className="text-sm font-bold text-sand-700 mt-0.5">{stat.label}</div>
                <div className="text-xs text-sand-400 mt-0.5">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Recommendation Hero Showcase ── */}
      {recommendedDestination && (
        <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h2 className="text-xl sm:text-2xl font-black text-forest-900 tracking-tight">
                  Top Recommended Sustainable Destination
                </h2>
              </div>
              <p className="text-sm text-sand-600 mt-0.5">
                AI selected based on current low crowd pressure and optimal weather.
              </p>
            </div>
            <Link
              to="/destinations"
              className="text-sm font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1 group"
            >
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                <img
                  src={recommendedDestination.heroImageUrl || recommendedDestination.image}
                  alt={recommendedDestination.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                    🌲 Eco-Sanctuary
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-3xl font-black">{recommendedDestination.name}</h3>
                  <p className="text-sm text-forest-200 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {recommendedDestination.region}, {recommendedDestination.country}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                        🌱 Eco Score: {recommendedDestination.sustainabilityScore}/100
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                        Crowd: {recommendedDestination.visitorPressure}
                      </span>
                    </div>
                  </div>

                  <p className="text-sand-700 text-sm sm:text-base leading-relaxed mb-6">
                    {recommendedDestination.description}
                  </p>

                  {/* Factor highlights */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {recommendedDestination.factors.slice(0, 4).map((f) => (
                      <div key={f.factor} className="p-3 bg-sand-50 rounded-xl border border-sand-200/60">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-forest-900">{f.icon} {f.factor}</span>
                          <span className="font-extrabold text-emerald-700">{f.score}/100</span>
                        </div>
                        <p className="text-[11px] text-sand-500 line-clamp-1">{f.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-sand-100">
                  <Link
                    to={`/destinations/${recommendedDestination.id}`}
                    className="w-full sm:flex-1 py-3.5 bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Explore Full Hub
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/trip-planner"
                    className="w-full sm:w-auto px-6 py-3.5 bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold text-sm rounded-xl text-center transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-forest-600" />
                    Plan Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Active / Recommended Challenge ── */}
      {recommendedChallenge && (
        <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-forest-900 tracking-tight">
                Challenge Recommended For You
              </h2>
              <p className="text-sm text-sand-600">Take action to earn points and help maintain trail health.</p>
            </div>
            <Link to="/challenges" className="text-sm font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1">
              All Challenges <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <ChallengeCard
            id={recommendedChallenge.id}
            title={recommendedChallenge.title}
            description={recommendedChallenge.description}
            icon={recommendedChallenge.icon}
            difficulty={recommendedChallenge.difficulty}
            points={recommendedChallenge.points}
            estimatedMinutes={recommendedChallenge.estimatedMinutes}
            isRecommended
          />
        </section>
      )}

      {/* ── All Sustainable Destinations ── */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-forest-900 tracking-tight">
              Explore Verified Green Destinations
            </h2>
            <p className="text-sm text-sand-600">Select any hub to inspect real-time visitor pressure and accessibility.</p>
          </div>
          <Link to="/destinations" className="text-sm font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1">
            View All ({destinations.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* ── Community Activity Feed Preview ── */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-forest-900 tracking-tight">
              Recent Community Impact
            </h2>
            <p className="text-sm text-sand-600">See what other conscious travelers are accomplishing on the trail.</p>
          </div>
          <Link to="/social" className="text-sm font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1">
            Community Feed <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-sand-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-11 h-11 bg-forest-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-forest-900 text-sm">{post.author.name}</p>
                      <p className="text-xs text-sand-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {post.destination}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-sand-400">Verified Trip</span>
                </div>

                {/* Image */}
                {post.imageUrl && (
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}

                {/* Caption & completion pill */}
                <div className="p-5 space-y-3">
                  <p className="text-sm text-sand-800 leading-relaxed">{post.caption}</p>

                  {post.challengeCompletion && (
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Completed Challenge: <strong>{post.challengeCompletion.challengeName}</strong> (+{post.challengeCompletion.points} pts)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Like / comment count */}
              <div className="px-5 py-3 border-t border-sand-100 flex items-center justify-between text-xs text-sand-600 font-semibold">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-red-600 transition-colors">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    {post.comments} Comments
                  </button>
                </div>
                <span className="text-sand-400">2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo Notice ── */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-center text-xs text-amber-800 font-medium">
        📋 <strong>Prototype Environment:</strong> All sustainability indices, live visitor counts, and rewards are simulated for demonstration.
      </div>
    </div>
  )
}
