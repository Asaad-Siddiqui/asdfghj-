import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Leaf,
  MapPin,
  Shield,
  Users,
  Trophy,
  TrendingUp,
  Globe,
  Recycle,
  Accessibility,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Star,
  Zap,
  BarChart3,
  Clock,
  ShieldCheck,
  Building2,
  TreePine,
} from 'lucide-react'
import { SustainabilityScore } from '@/components/common/SustainabilityScore'
import { destinations } from '@/data/mock-data'
import { cn } from '@/lib/utils'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-mesh selection:bg-emerald-500 selection:text-white">
      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-sand-200/60 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-800 rounded-2xl flex items-center justify-center shadow-md shadow-forest-700/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-forest-900 tracking-tight leading-none group-hover:text-forest-700 transition-colors">
                TRAVELLO
              </span>
              <span className="text-[10px] font-bold text-forest-600 tracking-wider uppercase">
                Green & Inclusive Travel
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-sand-700">
            <a href="#how-it-works" className="hover:text-forest-800 transition-colors">How It Works</a>
            <a href="#destinations" className="hover:text-forest-800 transition-colors">Destinations</a>
            <a href="#ai-intelligence" className="hover:text-forest-800 transition-colors">AI Intelligence</a>
            <a href="#features" className="hover:text-forest-800 transition-colors">Features</a>
            <a href="#accessibility" className="hover:text-forest-800 transition-colors">Accessibility</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-forest-800 bg-forest-50 hover:bg-forest-100 rounded-xl border border-forest-200/80 transition-all"
            >
              <BarChart3 className="w-3.5 h-3.5 text-forest-600" />
              Manager Demo
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-sm font-bold shadow-md shadow-forest-800/20 hover:shadow-lg transition-all flex items-center gap-2"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-white">
        {/* Background visual textures */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
        
        {/* Ambient floating elements */}
        <div className="absolute top-1/4 left-[5%] w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-[5%] w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-emerald-300 text-xs sm:text-sm font-semibold animate-fade-in shadow-sm">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50" />
                Smart India Hackathon PS5 • Green & Accessible Travel Platform
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
                Travel with purpose.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
                  Leave a lighter
                </span>
                <br />
                footprint behind.
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-forest-200/85 leading-relaxed max-w-2xl">
                Discover destinations with real-time sustainability health profiles. Plan AI-optimized low-impact itineraries, complete verified eco-challenges, and make tourism beneficial for local communities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/login"
                  className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/35 flex items-center justify-center gap-3 text-center"
                >
                  Start Your Journey Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/home"
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-3 text-center"
                >
                  <Play className="w-4 h-4 text-emerald-300 fill-current" />
                  Explore Live Demo
                </Link>
              </div>

              {/* Social Proof & Trust Badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-sm text-forest-300">
                <div className="flex items-center -space-x-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
                    alt="Traveler"
                    className="w-10 h-10 rounded-full border-2 border-forest-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
                    alt="Traveler"
                    className="w-10 h-10 rounded-full border-2 border-forest-900 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
                    alt="Traveler"
                    className="w-10 h-10 rounded-full border-2 border-forest-900 object-cover"
                  />
                  <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-forest-900 flex items-center justify-center text-white text-xs font-bold">
                    +12k
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-white font-bold ml-1.5">4.9/5</span>
                  </div>
                  <p className="text-xs text-forest-300/80">
                    Trusted by 12,000+ conscious explorers & 45 park authorities
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glowing border back-layer */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-slow" />

                {/* Main Card Container */}
                <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-forest-900/80 backdrop-blur-xl shadow-2xl">
                  {/* Hero Showcase Image */}
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img
                      src="https://www.clubmahindra.com/blog/images/Matheran-resized.jpg"
                      alt="Sahyadri Western Ghats Matheran"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                    
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Health Monitoring
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Featured Eco Hub</span>
                      <h3 className="text-2xl font-black text-white">Matheran Eco-Zone</h3>
                      <p className="text-sm text-forest-200/90 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        Maharashtra, India • Asia's only automobile-free hill station
                      </p>
                    </div>
                  </div>

                  {/* Interactive Snapshot Details */}
                  <div className="p-5 space-y-4 bg-forest-900/90">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-base">
                          82
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-forest-300 uppercase">Eco Score</p>
                          <p className="text-xs font-bold text-emerald-400">Excellent Health</p>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-base">
                          68%
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-forest-300 uppercase">Crowd Status</p>
                          <p className="text-xs font-bold text-amber-300">Moderate Flow</p>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic AI Recommendation Preview Box */}
                    <div className="bg-gradient-to-r from-emerald-950/80 to-forest-900/90 border border-emerald-500/30 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-forest-950 shrink-0 font-black">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-emerald-300">AI Real-Time Recommendation</p>
                          <p className="text-xs text-white/90 mt-1 leading-snug">
                            "Sunset Point is crowded (+200 visitors). Head to <strong>Charlotte Lake Trail</strong> for 42% lower footfall & +30 impact points!"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white text-forest-900 p-3.5 rounded-2xl shadow-2xl border border-sand-200 hidden sm:flex items-center gap-3 animate-float">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <p className="text-xs font-bold text-forest-900">Refill Champion</p>
                    <p className="text-[11px] font-semibold text-emerald-600">+50 Impact Points Earned</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Impact Metrics Bar ── */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-sand-200/90 p-6 sm:p-8 shadow-xl shadow-sand-300/20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '12,850+', label: 'Active Eco-Travelers', desc: 'Making mindful journeys', icon: Globe, color: 'text-emerald-600 bg-emerald-50' },
            { value: '48.2 Tons', label: 'CO₂ Avoided', desc: 'Through smart low-carbon routes', icon: Leaf, color: 'text-green-600 bg-green-50' },
            { value: '85+', label: 'Verified Challenges', desc: 'Real impact with photo evidence', icon: Trophy, color: 'text-amber-600 bg-amber-50' },
            { value: '100%', label: 'Explainable AI', desc: 'Zero mystery recommendations', icon: Sparkles, color: 'text-blue-600 bg-blue-50' },
          ].map((stat, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">{stat.value}</h4>
                <p className="text-sm font-bold text-forest-800">{stat.label}</p>
                <p className="text-xs text-sand-500">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works (The Responsible Travel Loop) ── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-forest-100 text-forest-800 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-forest-600" />
            The Closed-Loop Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-forest-900 tracking-tight mb-4">
            How The Green Travel Loop Works
          </h2>
          <p className="text-base sm:text-lg text-sand-600 leading-relaxed">
            Every conscious decision you make preserves ecosystems, empowers local homestays, and feeds real-time intelligence back to destination managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discover Transparently',
              desc: 'Browse destinations with granular sustainability factors, crowd indices, and accessibility grades before booking.',
              img: 'https://www.clubmahindra.com/blog/images/Matheran-resized.jpg',
              badge: 'Matheran Western Ghats',
              icon: Globe,
            },
            {
              step: '02',
              title: 'Plan With Explainable AI',
              desc: 'Get personalized day plans that bypass overtourism hotspots, pick green transport, and optimize your budget.',
              img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=600&fit=crop&auto=format',
              badge: 'Munnar Tea Hills, Kerala',
              icon: Sparkles,
            },
            {
              step: '03',
              title: 'Act, Prove & Earn',
              desc: 'Complete local cleanup or trail challenges, submit photo and timestamp evidence, and earn verified impact points.',
              img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&auto=format',
              badge: 'Palolem Beach, Goa',
              icon: ShieldCheck,
            },
            {
              step: '04',
              title: 'Protect & Improve',
              desc: 'Report issues on the trail. Your crowd data and reports automatically alert destination authorities to take action.',
              img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&auto=format',
              badge: 'Manali, Himachal Pradesh',
              icon: TrendingUp,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-sand-200 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-forest-900 font-black text-xs flex items-center justify-center shadow">
                    {item.step}
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <span className="px-2.5 py-1 bg-emerald-500/90 text-white rounded-full text-[11px] font-bold">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-forest-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-sand-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-sand-100 flex items-center text-xs font-bold text-forest-600 group-hover:text-forest-800">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Destinations Health Showcase ── */}
      <section id="destinations" className="py-20 px-4 sm:px-6 bg-forest-50/50 border-y border-sand-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                Live Destination Profiles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-forest-900 tracking-tight">
                Know The Real Impact Before You Travel
              </h2>
              <p className="text-base text-sand-600 mt-1 max-w-2xl">
                Every destination in Travello has an open, verifiable sustainability health score computed from real visitor flow, waste pressure, and local ecological sensitivity.
              </p>
            </div>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-sand-200 hover:border-forest-300 text-forest-800 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all shrink-0"
            >
              Browse All Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white rounded-3xl border border-sand-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Header Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                      {dest.region}
                    </span>
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-black text-forest-900 shadow-md">
                      Score: {dest.sustainabilityScore}/100
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black">{dest.name}</h3>
                    <p className="text-xs text-white/85 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {dest.country} • {dest.tags.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-sand-700 leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="space-y-2.5 p-3.5 bg-sand-50 rounded-2xl border border-sand-200/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-sand-600 font-semibold">Visitor Pressure</span>
                      <span className={cn(
                        'font-bold px-2 py-0.5 rounded-full',
                        dest.visitorPressure === 'High' || dest.visitorPressure === 'Very High'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      )}>
                        {dest.visitorPressure}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-sand-600 font-semibold">Wheelchair Accessible</span>
                      <span className="font-bold text-forest-800">
                        {dest.accessibility.wheelchairAccessible ? '✅ Yes' : '⚠️ Partial / Trails'}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/destinations/${dest.id}`}
                    className="w-full py-3 bg-forest-700 hover:bg-forest-800 text-white rounded-xl font-bold text-sm text-center shadow-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    View Destination Hub
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Intelligence Demo: Transparent AI in Action ── */}
      <section id="ai-intelligence" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Explainable AI Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-forest-900 tracking-tight mb-4">
            AI That Explains Every Single Choice
          </h2>
          <p className="text-base sm:text-lg text-sand-600">
            No black-box algorithms. See how Travello redirects overtourism into peaceful, sustainable alternatives.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-10 shadow-2xl shadow-sand-300/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: Overcrowded Hotspot */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-extrabold rounded-full flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    Traditional Hotspot Detected
                  </span>
                  <span className="text-xs font-bold text-red-600">Avoid Peak Hours</span>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop&auto=format"
                    alt="Crowded viewpoint Echo Point"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-red-950/20" />
                  <div className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow">
                    Sunset Point, Matheran
                  </div>
                </div>

                <div className="space-y-2 text-sm text-sand-700">
                  <div className="flex items-center justify-between py-1 border-b border-red-100">
                    <span className="text-sand-500">Visitor Density</span>
                    <span className="font-bold text-red-600">220+ Visitors/hr (Extreme)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-red-100">
                    <span className="text-sand-500">Wait Time at Entry</span>
                    <span className="font-bold text-red-600">~45 minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-red-100">
                    <span className="text-sand-500">Waste Risk</span>
                    <span className="font-bold text-red-600">High trail litter risk</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-red-100/60 rounded-xl text-xs text-red-800 font-medium">
                ⚠️ High crowd pressure harms trail biodiversity and creates long queues.
              </div>
            </div>

            {/* Right: Travello AI Smart Alternative */}
            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 p-6 flex flex-col justify-between shadow-lg shadow-emerald-500/10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Recommended Eco Alternative
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Recommended by Travello AI</span>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop&auto=format"
                    alt="Charlotte Lake Forest Trail Matheran"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20" />
                  <div className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow">
                    Charlotte Lake & Forest Canopy Trail
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  {[
                    '🌿 42% Lower Crowd Pressure',
                    '♿ Step-Free Accessible Start',
                    '💰 ₹200 Cheaper Entry / Food',
                    '🏡 Supports Local Guide Co-op',
                    '🚶 Pristine Canopy Views',
                    '🏆 +35 Impact Reward Points',
                  ].map((benefit, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-emerald-200/80 font-bold text-emerald-800 flex items-center">
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-emerald-100/80 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <p className="font-bold mb-0.5">Why the AI chose this for you:</p>
                <p className="leading-relaxed">
                  "You preserve local vegetation while enjoying identical 360° valley views without queues. You also earn double points toward your next badge."
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link
              to="/trip-planner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-forest-700 hover:bg-forest-800 text-white rounded-2xl font-bold text-base shadow-md transition-all"
            >
              <Sparkles className="w-5 h-5 text-emerald-300" />
              Generate Your AI Sustainable Itinerary Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Full Feature Ecosystem Grid ── */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Everything Needed For Modern Sustainable Travel
            </h2>
            <p className="text-base sm:text-lg text-forest-200/80">
              Designed from the ground up for both travelers and destination management authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Real-Time Sustainability Scores',
                desc: 'Comprehensive factor breakdowns across waste, water, carbon, biodiversity, and local community health.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10 border-emerald-500/20',
              },
              {
                icon: Accessibility,
                title: 'Accessibility-First Directory',
                desc: 'Verified step-free routes, tactile paths, wheelchair ramp audits, and quiet sensory zones for every hub.',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10 border-blue-500/20',
              },
              {
                icon: Sparkles,
                title: 'AI Smart Itinerary Engine',
                desc: 'Rule-based and heuristic AI that balances budget, visitor pressure, and accessibility needs in seconds.',
                color: 'text-amber-400',
                bg: 'bg-amber-500/10 border-amber-500/20',
              },
              {
                icon: ShieldCheck,
                title: 'Verified Eco Challenges',
                desc: 'Evidence-based rewards using photo validation, GPS bounding boxes, and timestamp checks.',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10 border-purple-500/20',
              },
              {
                icon: Recycle,
                title: 'Report & Protect Community',
                desc: 'Travelers report trail damage or waste, automatically notifying rangers and feeding manager heatmaps.',
                color: 'text-teal-400',
                bg: 'bg-teal-500/10 border-teal-500/20',
              },
              {
                icon: BarChart3,
                title: 'Destination Authority Dashboard',
                desc: 'Manager tools for municipal officers and park wardens to monitor visitor flow, issues, and eco-health.',
                color: 'text-rose-400',
                bg: 'bg-rose-500/10 border-rose-500/20',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-3xl p-7 border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border', f.bg)}>
                    <f.icon className={cn('w-6 h-6', f.color)} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-forest-200/75 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accessibility & Inclusion Spotlight ── */}
      <section id="accessibility" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-950 via-forest-900 to-forest-950 rounded-3xl p-8 sm:p-12 text-white border border-white/15 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold rounded-full">
                <Accessibility className="w-4 h-4 text-blue-400" />
                Inclusive Tourism For All
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Nature Belongs to Everyone.
              </h2>
              <p className="text-base text-forest-200/90 leading-relaxed">
                Travello audits trail steepness, wheelchair suitability, step-free access, and accessible restroom facilities for every attraction. We ensure travelers with disabilities or low walking endurance can travel with confidence and joy.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  '♿ Wheelchair Routes',
                  '🚶 Step-Free Trails',
                  '🚻 Accessible Toilets',
                  '🅿️ Dedicated Parking',
                  '🎧 Audio / Sensory Guides',
                  '🏨 Verified Eco-Stays',
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs font-bold text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-white">Accessibility Scorecard</span>
                  <span className="px-2.5 py-0.5 bg-emerald-400 text-forest-950 text-xs font-black rounded-full">
                    Audited
                  </span>
                </div>
                <div className="space-y-2 text-xs text-forest-200">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Matheran Toy Train Hub</span>
                    <span className="text-emerald-300 font-bold">100% Step-Free</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Goa South Beach Promenade</span>
                    <span className="text-emerald-300 font-bold">Wheelchair Ramp Active</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Hadimba Forest Boardwalk</span>
                    <span className="text-emerald-300 font-bold">Low Incline Grade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call To Action ── */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-forest-800 to-forest-950 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-sand-200">
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <span className="text-4xl">🌱</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to travel responsibly?
            </h2>
            <p className="text-base sm:text-lg text-forest-200/90 leading-relaxed">
              Join thousands of eco-conscious travelers. Choose your role to explore the live interactive prototype.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/home"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 rounded-2xl font-black text-base shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Enter As Traveler
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-base border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5 text-emerald-300" />
                Enter As Destination Manager
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-forest-950 text-white border-t border-white/10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-forest-950 font-black text-lg">
                T
              </div>
              <span className="text-xl font-black tracking-tight">TRAVELLO</span>
            </div>
            <p className="text-sm text-forest-300/80 leading-relaxed">
              AI-Powered Green & Inclusive Travel Platform. Smart India Hackathon PS5.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-emerald-400 uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/trip-planner" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/challenges" className="hover:text-white transition-colors">Eco Challenges</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors">Impact & Badges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-emerald-400 uppercase tracking-wider mb-3">Management</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Destination Dashboard</Link></li>
              <li><Link to="/reports/new" className="hover:text-white transition-colors">Report Issue</Link></li>
              <li><Link to="/creators" className="hover:text-white transition-colors">Creator Campaigns</Link></li>
              <li><Link to="/social" className="hover:text-white transition-colors">Community Feed</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-emerald-400 uppercase tracking-wider mb-3">Smart India Hackathon</h4>
            <p className="text-xs text-forest-300/80 leading-relaxed">
              Problem Statement 5: Green & Inclusive Travel — Smart Sustainable and Accessible Hospitality.
            </p>
            <p className="text-xs text-forest-400/60 mt-3">
              © {new Date().getFullYear()} Travello. All data simulated for prototype testing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
