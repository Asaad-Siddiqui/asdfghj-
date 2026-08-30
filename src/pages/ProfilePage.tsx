import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { cn } from '@/lib/utils'
import { Settings, LogOut, Shield, MapPin, ChevronRight, User as UserIcon, Sparkles, Trophy, Award, Zap } from 'lucide-react'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* ── Profile Header Card ── */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 bg-gradient-to-br from-forest-700 to-forest-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-md shrink-0 ring-4 ring-emerald-500/20">
            {user.displayName.charAt(0)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Verified Eco Traveler • Level 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-forest-900">{user.displayName}</h1>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700">{user.username}</p>
            <p className="text-xs sm:text-sm text-sand-600 pt-1 leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Impact Points', value: user.impactPoints, icon: Zap, color: 'text-amber-700 bg-amber-50' },
          { label: 'Badges Earned', value: user.badgesEarned, icon: Award, color: 'text-emerald-700 bg-emerald-50' },
          { label: 'Completed Missions', value: user.challengesCompleted, icon: Trophy, color: 'text-blue-700 bg-blue-50' },
          { label: 'Destinations', value: user.destinationsVisited, icon: MapPin, color: 'text-purple-700 bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-sand-200 p-4 shadow-sm flex flex-col justify-between">
            <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center mb-2', stat.color)}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-forest-900">{stat.value}</div>
              <div className="text-xs font-bold text-sand-500 mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Navigation Menu ── */}
      <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-sm">
        {[
          { label: 'My Impact & Leaderboard', path: '/impact', icon: '📊', sub: 'View badges & environmental impact' },
          { label: 'Eco Challenges & Missions', path: '/challenges', icon: '🏆', sub: 'Take action & earn rewards' },
          { label: 'Incident Reports & Telemetry', path: '/reports/new', icon: '📋', sub: 'Report trail and waste issues' },
          { label: 'AI Smart Trip Planner', path: '/trip-planner', icon: '✨', sub: 'Generate sustainable travel itineraries' },
          { label: 'Explore Verified Hubs', path: '/destinations', icon: '🌲', sub: 'Inspect sustainability scores' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-4 px-6 py-4.5 hover:bg-sand-50/80 transition-all border-b border-sand-100 last:border-0"
          >
            <span className="text-2xl p-2 bg-sand-50 rounded-xl">{item.icon}</span>
            <div className="flex-1">
              <span className="text-sm sm:text-base font-bold text-forest-900 block">{item.label}</span>
              <span className="text-xs text-sand-500 font-medium">{item.sub}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-sand-400" />
          </Link>
        ))}
      </div>

      {/* ── Role Switcher (Prototype Demo) ── */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-forest-900">Switch Persona & Demo View</h2>
          <p className="text-xs sm:text-sm text-sand-600 mt-0.5">
            Experience Travello as a Conscious Traveler or Destination Authority Manager.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-4 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-2xl text-left transition-all cursor-pointer flex items-start gap-3"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-forest-900 block">Traveler Interface</span>
              <span className="text-xs text-emerald-800">Trip planning, quests, community feed</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="p-4 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 rounded-2xl text-left transition-all cursor-pointer flex items-start gap-3"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-forest-900 block">Authority Dashboard</span>
              <span className="text-xs text-blue-800">Real-time telemetry, reports, AI insights</span>
            </div>
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-center">
        <p className="text-xs text-amber-800 font-medium">
          📋 <strong>Smart India Hackathon Prototype:</strong> Fully simulated client environment.
        </p>
      </div>
    </div>
  )
}
