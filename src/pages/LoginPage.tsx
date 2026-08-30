import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, User, Shield, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LoginPage() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'traveler' | 'manager'>('traveler')
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })

  const handleDemoLogin = (role: 'traveler' | 'manager') => {
    if (role === 'manager') {
      navigate('/dashboard')
    } else {
      navigate('/home')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleDemoLogin(selectedRole)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding & Photography */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.15),transparent_60%)]" />
        
        {/* Ambient glow */}
        <div className="absolute top-20 left-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">TRAVELLO</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-6">
              Travel Better.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-200">
                Leave a Lighter
                <br />Footprint.
              </span>
            </h1>

            <p className="text-base text-forest-200/90 max-w-md leading-relaxed mb-10">
              AI-driven sustainable travel platform connecting conscious travelers with real-time destination telemetry, crowd mitigation, and verified environmental quests.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15">
              {[
                { value: '3', label: 'Eco Pilot Hubs' },
                { value: '10+', label: 'Verified Quests' },
                { value: '100%', label: 'Explainable AI' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-300/80 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-forest-200">
            Smart India Hackathon • PS5 AI Sustainable & Inclusive Tourism Solution
          </div>
        </div>

        {/* Image overlay at bottom */}
        <img
          src="https://www.clubmahindra.com/blog/images/Matheran-resized.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
        />
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-mesh py-12">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-forest-800 rounded-xl flex items-center justify-center text-white font-black text-lg">
              🌱
            </div>
            <span className="text-xl font-black text-forest-900">TRAVELLO</span>
          </div>

          {/* Form Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">
              {isSignup ? 'Create Your Account' : 'Welcome to Travello'}
            </h2>
            <p className="text-sm text-sand-600 mt-1">
              {isSignup
                ? 'Join thousands of mindful travelers making destinations cleaner.'
                : 'Sign in to access your green travel itinerary and missions.'}
            </p>
          </div>

          {/* Quick Demo Role Selection (Top highlight) */}
          <div className="bg-white rounded-3xl border-2 border-forest-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-forest-900">Quick 1-Click Demo Entry</span>
            </div>
            <p className="text-xs text-sand-600">Select a persona to test the platform instantly:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('traveler')}
                className="p-3.5 bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-300 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-forest-900">Traveler</p>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">Explore & Quests</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('manager')}
                className="p-3.5 bg-blue-50 hover:bg-blue-100/80 border-2 border-blue-300 rounded-2xl text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-forest-900">Authority</p>
                <p className="text-xs text-blue-800 font-medium mt-0.5">Live Telemetry</p>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-sand-200" />
            <span className="text-xs text-sand-500 font-bold uppercase">or standard sign in</span>
            <div className="flex-1 h-px bg-sand-200" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-sand-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  type="email"
                  placeholder="traveler@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-sand-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-sand-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sand-400 hover:text-sand-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSignup ? 'Create Account & Enter' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle */}
          <p className="text-xs sm:text-sm text-sand-600 text-center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-forest-700 hover:underline font-bold cursor-pointer"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
