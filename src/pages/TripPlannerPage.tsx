import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Sparkles, MapPin, Clock, Wallet, Accessibility, Leaf, ChevronRight, RefreshCw, Check, CheckCircle2 } from 'lucide-react'
import { cn, getScoreColor } from '@/lib/utils'

export function TripPlannerPage() {
  const navigate = useNavigate()
  const { destinations, selectedDestination, generateTripPlan, tripPlan } = useApp()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(!!tripPlan)

  const [form, setForm] = useState({
    destinationId: selectedDestination?.id || destinations[0]?.id || '',
    days: 1,
    budget: 'moderate',
    interests: 'nature',
    accessibility: 'none',
    transport: 'public',
    sustainability: 'high',
  })

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      generateTripPlan(form.destinationId, form)
      setIsGenerating(false)
      setGenerated(true)
    }, 1200)
  }

  const selectedDest = destinations.find((d) => d.id === form.destinationId)
  const plan = tripPlan

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* ── Header ── */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">
            AI Sustainable Trip Planner
          </h1>
        </div>
        <p className="text-sm sm:text-base text-sand-600 max-w-3xl leading-relaxed">
          Generate an intelligent, crowd-balanced travel itinerary optimized for low carbon footprint, accessible routes, and local economic support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Preferences Form (4 cols) ── */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-7 shadow-sm sticky top-24 space-y-5">
            <div className="flex items-center justify-between border-b border-sand-100 pb-3">
              <h2 className="text-lg font-bold text-forest-900">Itinerary Preferences</h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                AI Engine
              </span>
            </div>

            <div className="space-y-4">
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                  Target Destination
                </label>
                <select
                  value={form.destinationId}
                  onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
                  className="w-full px-3.5 py-3 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1.5">
                  <Wallet className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                  Budget Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['budget', 'moderate', 'premium'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setForm({ ...form, budget: b })}
                      className={cn(
                        'py-2.5 rounded-xl text-xs font-bold capitalize border transition-all',
                        form.budget === b
                          ? 'bg-forest-700 text-white border-forest-700 shadow-sm'
                          : 'bg-sand-50 border-sand-200 text-sand-700 hover:bg-sand-100'
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1.5">
                  <Accessibility className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                  Accessibility Preference
                </label>
                <select
                  value={form.accessibility}
                  onChange={(e) => setForm({ ...form, accessibility: e.target.value })}
                  className="w-full px-3.5 py-3 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
                >
                  <option value="none">Standard trails & stairs</option>
                  <option value="wheelchair">Wheelchair accessible only</option>
                  <option value="step-free">Step-free routes preferred</option>
                  <option value="low-walking">Low walking endurance</option>
                </select>
              </div>

              {/* Sustainability Priority */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1.5">
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
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-sand-50 border-sand-200 text-sand-700 hover:bg-sand-100'
                      )}
                    >
                      {s.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sand-600 mb-1.5">
                  Transport Preference
                </label>
                <select
                  value={form.transport}
                  onChange={(e) => setForm({ ...form, transport: e.target.value })}
                  className="w-full px-3.5 py-3 bg-sand-50 border border-sand-200 rounded-xl text-sm font-semibold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 cursor-pointer"
                >
                  <option value="public">Shared / Electric transport</option>
                  <option value="walking">Walking & hiking preferred</option>
                  <option value="cycling">Bicycle friendly</option>
                  <option value="private">Private vehicle</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                    Synthesizing Route...
                  </>
                ) : generated ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-emerald-300" />
                    Regenerate Optimized Plan
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

        {/* ── Output Itinerary (8 cols) ── */}
        <div className="lg:col-span-8">
          {!generated && !isGenerating && (
            <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center shadow-sm space-y-3">
              <div className="text-5xl mb-2">🗺️</div>
              <h3 className="text-xl font-bold text-forest-900">Ready To Plan Your Green Adventure</h3>
              <p className="text-sm text-sand-600 max-w-md mx-auto leading-relaxed">
                Configure your destination and budget on the left to generate an AI-tailored route with crowd mitigation.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center shadow-sm space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-8 h-8 text-emerald-700 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-forest-900">Analyzing Destination Conditions</h3>
              <p className="text-sm text-sand-600 max-w-md mx-auto">
                Evaluating trail crowd density, eco-certified homestays, and accessibility grading...
              </p>
            </div>
          )}

          {generated && plan && selectedDest && (
            <div className="space-y-6">
              
              {/* Plan Summary Card */}
              <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    AI Optimized Itinerary
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-forest-900">
                    {selectedDest.name} Eco Experience
                  </h2>
                  <p className="text-sm text-sand-600 mt-1">
                    Balanced timing to avoid peak congestion.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 bg-sand-50 p-4 rounded-2xl border border-sand-200/60">
                  <div className="text-center">
                    <span className="text-xs text-sand-500 font-bold block">ESTIMATED COST</span>
                    <span className="text-lg font-black text-forest-900">~₹{plan.totalEstimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="h-8 w-px bg-sand-200" />
                  <div className="text-center">
                    <span className="text-xs text-sand-500 font-bold block">ECO SCORE</span>
                    <span className="text-lg font-black text-emerald-600">{plan.sustainabilityScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Schedule */}
              {plan.days.map((day) => (
                <div key={day.day} className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-sand-100 pb-4">
                    <h3 className="text-xl font-bold text-forest-900">Day {day.day} Schedule</h3>
                    <span className="text-xs font-bold text-sand-500 bg-sand-100 px-3 py-1 rounded-full">
                      {day.activities.length} Mindful Stops
                    </span>
                  </div>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-sand-200">
                    {day.activities.map((activity, i) => (
                      <div key={i} className="relative flex items-start gap-4">
                        {/* Timeline Node */}
                        <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm flex items-center justify-center text-white text-[10px] font-bold">
                          {i + 1}
                        </div>

                        {/* Activity Card */}
                        <div className="flex-1 bg-sand-50/80 rounded-2xl p-5 border border-sand-200/60 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                                ⏰ {activity.time}
                              </span>
                              <h4 className="text-base sm:text-lg font-bold text-forest-900 mt-1">
                                {activity.name}
                              </h4>
                            </div>
                            <span className="text-xs font-bold text-sand-600 capitalize bg-white px-2.5 py-1 rounded-lg border border-sand-200">
                              {activity.type}
                            </span>
                          </div>

                          <p className="text-sm text-sand-700 leading-relaxed">
                            {activity.sustainabilityImpact}
                          </p>

                          {/* Meta Tags */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-1 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                              👥 {activity.crowdLevel} Crowd
                            </span>
                            <span className="px-2.5 py-1 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                              ♿ {activity.accessibility}
                            </span>
                            <span className="px-2.5 py-1 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                              💰 ₹{activity.estimatedCost}
                            </span>
                            <span className="px-2.5 py-1 bg-white rounded-lg border border-sand-200 font-semibold text-sand-700">
                              ⏱ {activity.travelTime}
                            </span>
                          </div>

                          {/* AI Recommendation Reason */}
                          <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">
                              <strong>Why Chosen:</strong> {activity.whyRecommended}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* AI Why This Plan Explanation Banner */}
              <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                  <h4 className="text-base font-bold text-white">Why This Itinerary Is Sustainable</h4>
                </div>
                <p className="text-sm text-forest-100/90 leading-relaxed">
                  This route avoids peak crowd hours at high-pressure viewpoints, promotes verified eco-friendly homestays and local guide associations, and uses lower-emission travel paths.
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}
