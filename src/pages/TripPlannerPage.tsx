import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import {
  Sparkles,
  MapPin,
  Clock,
  Wallet,
  Accessibility,
  Leaf,
  RefreshCw,
  FileSpreadsheet,
  Download,
  Users,
  Building,
  Utensils,
  Compass,
  Bus,
  ShieldCheck,
  CheckCircle2,
  PieChart as PieIcon,
  ListOrdered,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

export function TripPlannerPage() {
  const navigate = useNavigate()
  const { destinations, selectedDestination, generateTripPlan, tripPlan } = useApp()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(!!tripPlan)
  const [showHoverModal, setShowHoverModal] = useState(false)
  const [viewTab, setViewTab] = useState<'dashboard' | 'itinerary'>('dashboard')

  const [form, setForm] = useState({
    destinationId: selectedDestination?.id || destinations[0]?.id || '',
    days: 4,
    travelers: 4,
    budgetAmount: 2500,
    budgetLevel: 'moderate',
    interests: 'nature',
    accessibility: 'step-free',
    transport: 'public',
    sustainability: 'ultra-eco',
  })

  const selectedDest = destinations.find((d) => d.id === form.destinationId) || destinations[0]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      generateTripPlan(form.destinationId, form)
      setIsGenerating(false)
      setGenerated(true)
      setShowHoverModal(true)
    }, 1200)
  }

  // Calculated Budget Data
  const numDays = Number(form.days) || 4
  const numTravelers = Number(form.travelers) || 4
  const totalBudget = Number(form.budgetAmount) * numTravelers || 10000

  const budgetCategories = [
    { category: 'Transport & Passes', budget: Math.round(totalBudget * 0.28), actual: Math.round(totalBudget * 0.26), icon: Bus },
    { category: 'Accommodation & Stays', budget: Math.round(totalBudget * 0.35), actual: Math.round(totalBudget * 0.34), icon: Building },
    { category: 'Food & Dining', budget: Math.round(totalBudget * 0.18), actual: Math.round(totalBudget * 0.19), icon: Utensils },
    { category: 'Activities & Guides', budget: Math.round(totalBudget * 0.12), actual: Math.round(totalBudget * 0.11), icon: Compass },
    { category: 'Eco Offsets & Offsets', budget: Math.round(totalBudget * 0.07), actual: Math.round(totalBudget * 0.05), icon: Leaf },
  ]

  const totalActual = budgetCategories.reduce((sum, c) => sum + c.actual, 0)
  const totalDifference = totalBudget - totalActual
  const actualPerPerson = Math.round(totalActual / numTravelers)
  const budgetPerPerson = Math.round(totalBudget / numTravelers)
  const diffPerPerson = budgetPerPerson - actualPerPerson

  // Recharts Donut Data
  const donutData = [
    { name: 'Spent', value: totalActual, color: '#10b981' },
    { name: 'Remaining', value: Math.max(0, totalDifference), color: '#e5e1d5' },
  ]

  // Line Item Expense Log
  const expenseLogItems = [
    { date: '10 May 2026', category: 'Transport', desc: 'Electric Eco-Shuttle Pass', budget: 1200, actual: 1150 },
    { date: '11 May 2026', category: 'Accommodation', desc: 'Verified Green Homestay (2 Nights)', budget: 3500, actual: 3400 },
    { date: '12 May 2026', category: 'Food & Dining', desc: 'Organic Farm-to-Table Lunch', budget: 800, actual: 820 },
    { date: '13 May 2026', category: 'Activities', desc: 'Guided Accessible Nature Walk', budget: 600, actual: 550 },
    { date: '14 May 2026', category: 'Eco Offsets', desc: 'Community Reforestation Contribution', budget: 400, actual: 350 },
  ]

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6 lg:px-8 font-sans-ui text-forest-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── Page Header ── */}
        <div className="bg-white rounded-3xl border border-sand-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              AI Sustainable Itinerary & Budget Engine
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 tracking-tight">
              Plan Your Trip & Budget
            </h1>
            <p className="text-sm sm:text-base text-sand-600 max-w-2xl leading-relaxed">
              Generate an intelligent, crowd-balanced travel itinerary complete with an interactive budget breakdown and real-time expense tracking.
            </p>
          </div>

          {generated && (
            <button
              onClick={() => setShowHoverModal(true)}
              className="px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 group"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300 group-hover:rotate-6 transition-transform" />
              Open Floating Dashboard
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left Preferences Form (4 cols) ── */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-sand-200/80 p-6 sm:p-7 shadow-xs sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-sand-100 pb-3">
                <h2 className="text-base font-bold text-forest-950">Trip Preferences</h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  AI Generator
                </span>
              </div>

              <div className="space-y-4">
                {/* Target Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Target Destination
                  </label>
                  <select
                    value={form.destinationId}
                    onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
                    className="w-full px-3.5 py-3 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.region})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration & Travelers */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                      <Clock className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={form.days}
                      onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                      <Users className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                      Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={form.travelers}
                      onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Budget Per Person */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                    <Wallet className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Budget Per Person ($ / ₹)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={form.budgetAmount}
                    onChange={(e) => setForm({ ...form, budgetAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm font-bold text-forest-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Accessibility Mode */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                    <Accessibility className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Accessibility Mode
                  </label>
                  <select
                    value={form.accessibility}
                    onChange={(e) => setForm({ ...form, accessibility: e.target.value })}
                    className="w-full px-3.5 py-3 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="none">Standard trails & stairs</option>
                    <option value="wheelchair">Wheelchair accessible only</option>
                    <option value="step-free">Step-free routes preferred</option>
                    <option value="low-walking">Low walking endurance</option>
                  </select>
                </div>

                {/* Sustainability Priority */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sand-500 mb-1.5">
                    <Leaf className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                    Sustainability Priority
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['moderate', 'high', 'ultra-eco'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setForm({ ...form, sustainability: s })}
                        className={cn(
                          'py-2.5 rounded-xl text-xs font-bold capitalize border transition-all',
                          form.sustainability === s
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-sand-50 border-sand-200 text-sand-700 hover:bg-sand-100'
                        )}
                      >
                        {s.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Action Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                      Generating Floating Dashboard...
                    </>
                  ) : generated ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      Regenerate & Open Dashboard
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      Generate Smart Itinerary
                    </>
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* ── Right Section (8 cols) ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {!generated && !isGenerating && (
              <div className="bg-white rounded-3xl border border-sand-200/80 p-12 text-center shadow-xs space-y-3">
                <div className="text-5xl mb-2">🗺️</div>
                <h3 className="text-xl font-bold text-forest-950">Ready To Plan Your Green Adventure</h3>
                <p className="text-sm text-sand-600 max-w-md mx-auto leading-relaxed">
                  Configure your target destination, duration, and budget on the left to launch the floating Trip Budget Dashboard.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="bg-white rounded-3xl border border-sand-200/80 p-12 text-center shadow-xs space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-8 h-8 text-emerald-700 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-forest-950">Synthesizing Sustainable Budget & Itinerary</h3>
                <p className="text-sm text-sand-600 max-w-md mx-auto">
                  Computing crowd-mitigated routes, eco-homestays, and line-item budget tracking...
                </p>
              </div>
            )}

            {/* When Generated: Sleek Hero Callout Card to Launch Floating Dashboard */}
            {generated && selectedDest && (
              <div className="bg-white rounded-3xl border border-sand-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-white p-6 sm:p-8 shadow-xl border border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border border-emerald-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      AI Itinerary Generated
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {selectedDest.name} Budget Dashboard
                    </h2>
                    <p className="text-xs sm:text-sm text-forest-200/90 max-w-md">
                      {form.days} Days • {form.travelers} Travelers • Total Budget: ${totalBudget.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowHoverModal(true)}
                    className="px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 shrink-0 group hover:scale-105"
                  >
                    <FileSpreadsheet className="w-5 h-5 text-forest-950 group-hover:rotate-6 transition-transform" />
                    Open Hovering Dashboard <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Day-by-day teaser summary cards */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-sand-500">
                    Itinerary Highlights Preview
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-sand-50/80 p-4 rounded-2xl border border-sand-200/60 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Day 1</span>
                      <h4 className="font-bold text-forest-950 text-sm">Arrival & Eco-Cottage Check-in</h4>
                      <p className="text-xs text-sand-600">Crowd mitigation route via main rail hub</p>
                    </div>

                    <div className="bg-sand-50/80 p-4 rounded-2xl border border-sand-200/60 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Day 2</span>
                      <h4 className="font-bold text-forest-950 text-sm">Panorama Trail & Sunset Point</h4>
                      <p className="text-xs text-sand-600">Step-free ramp access verified</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* 🌟 ULTRA-AESTHETIC HOVERING / POPPING DASHBOARD DIV (MODAL OVERLAY) 🌟 */}
      {showHoverModal && selectedDest && (
        <div className="fixed inset-0 z-50 bg-forest-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          
          <div className="bg-[#f7f9f7] rounded-3xl border border-emerald-500/30 shadow-2xl shadow-forest-950/60 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative text-forest-950 flex flex-col justify-between animate-scale-in">
            
            {/* Hovering Sticky Header Bar */}
            <div className="bg-white/95 backdrop-blur-md px-6 py-5 border-b border-sand-200/80 sticky top-0 z-30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950">
                    SEE YOUR ENTIRE TRIP BUDGET AT A GLANCE
                  </h3>
                  <p className="text-xs text-sand-600 font-medium">
                    Interactive Dashboard • Automatic Charts • Real-Time Budget Tracking
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Tab Switcher: Budget Tracker vs Detailed Schedule */}
                <div className="flex items-center gap-1 bg-sand-100 p-1 rounded-2xl border border-sand-200">
                  <button
                    onClick={() => setViewTab('dashboard')}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
                      viewTab === 'dashboard'
                        ? 'bg-forest-900 text-white shadow-xs'
                        : 'text-sand-700 hover:text-forest-950'
                    )}
                  >
                    <PieIcon className="w-3.5 h-3.5" /> Budget Tracker
                  </button>

                  <button
                    onClick={() => setViewTab('itinerary')}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
                      viewTab === 'itinerary'
                        ? 'bg-forest-900 text-white shadow-xs'
                        : 'text-sand-700 hover:text-forest-950'
                    )}
                  >
                    <ListOrdered className="w-3.5 h-3.5" /> Detailed Schedule
                  </button>
                </div>

                <button
                  onClick={() => setShowHoverModal(false)}
                  className="p-2.5 rounded-full hover:bg-sand-200 text-sand-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Floating Dashboard Body Content */}
            {viewTab === 'dashboard' && (
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                
                {/* Main Green Tracker Container */}
                <div className="bg-white rounded-3xl border border-sand-200/80 overflow-hidden shadow-xs">
                  
                  <div className="bg-forest-900 text-white text-center py-2.5 font-bold text-xs uppercase tracking-widest border-b border-forest-800">
                    TRAVEL BUDGET TRACKER
                  </div>

                  <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Column: Trip Details Table (4 cols) */}
                    <div className="lg:col-span-4 bg-sand-50/80 rounded-2xl p-4 border border-sand-200/60 space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-forest-900 border-b border-sand-200 pb-2">
                        TRIP DETAILS
                      </h4>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-sand-200/50">
                          <span className="text-sand-600 font-semibold">📍 Destination</span>
                          <span className="font-bold text-forest-950">{selectedDest.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-sand-200/50">
                          <span className="text-sand-600 font-semibold">📅 Travel Dates</span>
                          <span className="font-bold text-forest-950">10 May - 14 May 2026</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-sand-200/50">
                          <span className="text-sand-600 font-semibold">⏱ Travel Length</span>
                          <span className="font-bold text-forest-950">{form.days} Days</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-sand-200/50">
                          <span className="text-sand-600 font-semibold">👥 Travellers</span>
                          <span className="font-bold text-forest-950">{form.travelers} Persons</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-sand-200/50">
                          <span className="text-sand-600 font-semibold">💳 Currency</span>
                          <span className="font-bold text-forest-950">USD - Dollars</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sand-600 font-semibold">🌱 Eco Rating</span>
                          <span className="font-bold text-emerald-700">92/100 Excellent</span>
                        </div>
                      </div>
                    </div>

                    {/* Center Column: Destination Hero Image Card (4 cols) */}
                    <div className="lg:col-span-4 relative h-64 rounded-2xl overflow-hidden border border-sand-300 shadow-md group">
                      <img
                        src={selectedDest.image}
                        alt={selectedDest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-300 border border-white/20">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {selectedDest.region}
                        </div>
                        <h3 className="text-xl font-black">{selectedDest.name.toUpperCase()}</h3>
                        <p className="text-xs text-sand-200 font-medium">10 May 2026 - 14 May 2026</p>
                      </div>
                    </div>

                    {/* Right Column: Budget Summary & Donut Ring (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-sand-50 p-2.5 rounded-xl border border-sand-200">
                          <span className="text-[10px] font-bold text-sand-500 uppercase block">Total Budget</span>
                          <span className="text-base font-black text-forest-950">${totalBudget.toLocaleString()}</span>
                        </div>
                        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase block">Total Actual</span>
                          <span className="text-base font-black text-emerald-800">${totalActual.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200 text-center">
                        <span className="text-[10px] font-extrabold text-emerald-800 uppercase block">Total Difference</span>
                        <span className="text-sm font-black text-emerald-900">${totalDifference.toLocaleString()} (Under Budget)</span>
                      </div>

                      <div className="h-28 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={donutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={45}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {donutData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] font-extrabold text-sand-600">USED</span>
                          <span className="text-xs font-black text-forest-950">
                            {Math.round((totalActual / totalBudget) * 100)}%
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* 3-Column Sub Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Sub Card 1: Expense Tracker */}
                  <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs space-y-3">
                    <div className="bg-forest-900 text-white text-center py-1.5 rounded-xl font-bold text-xs">
                      Expense Tracker
                    </div>

                    <div className="space-y-2 text-xs">
                      {expenseLogItems.map((item, i) => (
                        <div key={i} className="p-2 bg-sand-50 rounded-xl border border-sand-200/60 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-forest-950">{item.desc}</p>
                            <p className="text-[10px] text-sand-500">{item.date} • {item.category}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-emerald-700 block">${item.actual}</span>
                            <span className="text-[10px] text-sand-500 font-semibold">Budget: ${item.budget}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub Card 2: Budget Split (Actual) */}
                  <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="bg-forest-900 text-white text-center py-1.5 rounded-xl font-bold text-xs">
                      BUDGET SPLIT (ACTUAL)
                    </div>

                    <div className="space-y-3 py-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-sand-100">
                        <span className="text-sand-600 font-semibold">Total Actual Expenses</span>
                        <span className="font-black text-forest-950">${totalActual.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-sand-100">
                        <span className="text-sand-600 font-semibold">Number of Travellers</span>
                        <span className="font-bold text-forest-950">{numTravelers}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-sand-100">
                        <span className="text-sand-600 font-semibold">Actual Per Person</span>
                        <span className="font-black text-emerald-700">${actualPerPerson.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-sand-100">
                        <span className="text-sand-600 font-semibold">Budget Per Person</span>
                        <span className="font-bold text-forest-950">${budgetPerPerson.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1.5 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                        <span className="text-emerald-900 font-bold">Difference Per Person</span>
                        <span className="font-black text-emerald-800">${diffPerPerson.toLocaleString()} (Under)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-sand-50 rounded-2xl text-[11px] text-center text-sand-600 font-semibold border border-sand-200">
                      💡 Group rates applied for eco-transits & homestay bookings
                    </div>
                  </div>

                  {/* Sub Card 3: Summary By Category */}
                  <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs space-y-3">
                    <div className="bg-forest-900 text-white text-center py-1.5 rounded-xl font-bold text-xs">
                      SUMMARY BY CATEGORY
                    </div>

                    <div className="space-y-2 text-xs">
                      {budgetCategories.map((cat) => {
                        const Icon = cat.icon
                        const usedPct = Math.round((cat.actual / cat.budget) * 100)
                        return (
                          <div key={cat.category} className="space-y-1">
                            <div className="flex items-center justify-between font-bold">
                              <span className="flex items-center gap-1.5 text-forest-950">
                                <Icon className="w-3.5 h-3.5 text-emerald-600" /> {cat.category}
                              </span>
                              <span className="text-emerald-700 font-black">${cat.actual}</span>
                            </div>
                            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(usedPct, 100)}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>

                {/* Feature Badges Footer */}
                <div className="bg-white rounded-2xl p-4 border border-sand-200 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-sand-700">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Fully Automated AI Generation
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <Download className="w-4 h-4 text-emerald-600" /> Instant Digital PDF Download
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <Leaf className="w-4 h-4 text-emerald-600" /> Low-Carbon Route Verified
                  </span>
                </div>

              </div>
            )}

            {/* Detailed Day-by-Day Schedule Tab View */}
            {viewTab === 'itinerary' && tripPlan && (
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                {tripPlan.days.map((day) => (
                  <div key={day.day} className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs space-y-5">
                    <div className="flex items-center justify-between border-b border-sand-100 pb-3">
                      <h3 className="text-base sm:text-lg font-bold text-forest-950">Day {day.day} Schedule</h3>
                      <span className="text-xs font-bold text-sand-600 bg-sand-100 px-3 py-1 rounded-full">
                        {day.activities.length} Mindful Stops
                      </span>
                    </div>

                    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-sand-200">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="relative flex items-start gap-4">
                          <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white shadow-xs flex items-center justify-center text-white text-[10px] font-bold">
                            {i + 1}
                          </div>

                          <div className="flex-1 bg-sand-50/80 rounded-2xl p-4 border border-sand-200/60 space-y-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div>
                                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                                  ⏰ {activity.time}
                                </span>
                                <h4 className="text-sm sm:text-base font-bold text-forest-950 mt-1">
                                  {activity.name}
                                </h4>
                              </div>
                              <span className="text-xs font-bold text-sand-600 capitalize bg-white px-2.5 py-0.5 rounded-lg border border-sand-200">
                                {activity.type}
                              </span>
                            </div>

                            <p className="text-xs text-sand-700 leading-relaxed">
                              {activity.sustainabilityImpact}
                            </p>

                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-0.5 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                                👥 {activity.crowdLevel} Crowd
                              </span>
                              <span className="px-2 py-0.5 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                                ♿ {activity.accessibility}
                              </span>
                              <span className="px-2 py-0.5 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                                💰 ${activity.estimatedCost}
                              </span>
                            </div>

                            <div className="p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="font-medium">
                                <strong>Why Chosen:</strong> {activity.whyRecommended}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hovering Sticky Footer */}
            <div className="bg-white/95 backdrop-blur-md px-6 py-4 border-t border-sand-200/80 sticky bottom-0 z-30 flex items-center justify-between">
              <span className="text-xs text-sand-500 font-semibold">
                Generated with TRAVELLO AI Sustainable Engine
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Exporting PDF...')}
                  className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-forest-950 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
                <button
                  onClick={() => setShowHoverModal(false)}
                  className="px-6 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  Done
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}
