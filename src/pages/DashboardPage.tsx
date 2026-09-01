import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ReportCard } from '@/components/common/ReportCard'
import { cn } from '@/lib/utils'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import {
  LayoutDashboard,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  ChevronRight,
  RefreshCw,
  Search,
  Users,
  Leaf,
  Clock,
  ArrowUpRight,
  Zap,
  Activity,
  Radio,
  BarChart3,
  MapPin,
} from 'lucide-react'

const PIE_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6']

export function DashboardPage() {
  const { destinations, reports, aiInsights, challenges, completions } = useApp()
  const [selectedDest, setSelectedDest] = useState('matheran')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'insights'>('overview')

  const destination = destinations.find((d) => d.id === selectedDest) || destinations[0]
  const destReports = reports.filter((r) => r.destinationId === selectedDest)
  const destInsights = aiInsights.filter((i) => i.destinationId === selectedDest)

  const filteredReports = destReports.filter((r) => {
    const matchesCategory = selectedCategoryFilter === 'all' || r.category === selectedCategoryFilter
    const matchesSearch =
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categoryData = destReports.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value,
  }))

  // 1. Weekly Incident vs Resolution Trend Data
  const trendData = [
    { day: 'Mon', reports: 4, resolved: 3, visitors: 420, ecoScore: 84 },
    { day: 'Tue', reports: 6, resolved: 5, visitors: 480, ecoScore: 82 },
    { day: 'Wed', reports: 3, resolved: 4, visitors: 390, ecoScore: 85 },
    { day: 'Thu', reports: 8, resolved: 6, visitors: 560, ecoScore: 81 },
    { day: 'Fri', reports: 5, resolved: 5, visitors: 710, ecoScore: 83 },
    { day: 'Sat', reports: 12, resolved: 8, visitors: 1250, ecoScore: 78 },
    { day: 'Sun', reports: 9, resolved: 9, visitors: 980, ecoScore: 82 },
  ]

  // 2. Hourly Visitor Density Bar Chart Data
  const hourlyDensityData = [
    { hour: '8 AM', visitors: 120, capacity: 400 },
    { hour: '10 AM', visitors: 280, capacity: 400 },
    { hour: '12 PM', visitors: 390, capacity: 400 },
    { hour: '2 PM', visitors: 480, capacity: 400 },
    { hour: '4 PM', visitors: 420, capacity: 400 },
    { hour: '6 PM', visitors: 260, capacity: 400 },
    { hour: '8 PM', visitors: 90, capacity: 400 },
  ]

  // 3. Environmental Sub-Index Scores
  const ecoFactors = [
    { factor: 'Air Purity Grade', score: 94, status: 'Pristine', color: 'bg-emerald-500' },
    { factor: 'Trail Litter Management', score: 82, status: 'Good', color: 'bg-emerald-600' },
    { factor: 'Water Refill Stations', score: 76, status: 'Moderate', color: 'bg-amber-500' },
    { factor: 'Noise Level Index', score: 88, status: 'Quiet Zone', color: 'bg-teal-500' },
    { factor: 'Wheelchair Route Integrity', score: 78, status: 'Audited', color: 'bg-purple-500' },
  ]

  const openCount = destReports.filter((r) => r.status !== 'resolved').length
  const resolvedCount = destReports.filter((r) => r.status === 'resolved').length
  const resolutionPercentage = Math.round((resolvedCount / (destReports.length || 1)) * 100)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6 lg:px-8 font-sans-ui text-forest-950">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Executive Header Banner ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-white p-6 sm:p-8 shadow-2xl border border-forest-800/80">
          
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live Operations Telemetry
                </span>
                <span className="px-3 py-1 bg-white/10 border border-white/15 text-sand-200 rounded-full text-xs font-bold">
                  Manager Suite v2.4
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Destination Intelligence & Control
              </h1>

              <p className="text-sm sm:text-base text-forest-200/85 leading-relaxed font-normal">
                Real-time ecological monitoring, visitor load density balancing, crowdsourced incident resolution & AI directives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="relative">
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full sm:w-auto pl-4 pr-10 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer appearance-none shadow-lg transition-all"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id} className="bg-forest-900 text-white">
                      📍 {d.name} ({d.region})
                    </option>
                  ))}
                </select>
                <ChevronRight className="w-4 h-4 text-emerald-300 absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>

              <button
                onClick={handleRefresh}
                className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all flex items-center justify-center shadow-lg"
                title="Refresh Telemetry Data"
              >
                <RefreshCw className={cn("w-4 h-4 text-emerald-300", isRefreshing && "animate-spin")} />
              </button>

              <button
                onClick={() => alert(`Exporting Executive Telemetry Package for ${destination.name} (PDF & CSV)`)}
                className="px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/35 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Telemetry
              </button>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Telemetry Overview', icon: Activity },
              { id: 'incidents', label: `Incidents Feed (${openCount} Open)`, icon: AlertTriangle },
              { id: 'insights', label: `AI Directives (${destInsights.length})`, icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap',
                    isActive
                      ? 'bg-emerald-500 text-forest-950 shadow-md font-black'
                      : 'bg-white/5 hover:bg-white/10 text-forest-200 hover:text-white border border-white/10'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-forest-950' : 'text-emerald-300')} />
                  {tab.label}
                </button>
              )
            })}
          </div>

        </div>

        {/* ── 5 KPI CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">ECO HEALTH SCORE</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-forest-950 tracking-tight">
                  {destination.sustainabilityScore}
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  / 100
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +3.2 pts vs last month
              </p>
            </div>
            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${destination.sustainabilityScore}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">OPEN INCIDENTS</span>
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-forest-950 tracking-tight">{openCount}</span>
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  Needs Action
                </span>
              </div>
              <p className="text-xs font-semibold text-sand-600 mt-1">Requires Ranger dispatch</p>
            </div>
            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(openCount * 20, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">RESOLUTION RATE</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-forest-950 tracking-tight">
                  {resolutionPercentage}%
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {resolvedCount} Solved
                </span>
              </div>
              <p className="text-xs font-bold text-blue-700 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> Avg turnaround: 2.4h
              </p>
            </div>
            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${resolutionPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">VERIFIED ACTIONS</span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-forest-950 tracking-tight">
                  {completions.filter((c) => c.status === 'completed').length + 42}
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  Proof OK
                </span>
              </div>
              <p className="text-xs font-semibold text-sand-600 mt-1">Submitted by Eco-Travelers</p>
            </div>
            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full w-4/5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sand-500 uppercase tracking-wider">VISITOR LOAD</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-forest-950 tracking-tight">68%</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Moderate
                </span>
              </div>
              <p className="text-xs font-semibold text-sand-600 mt-1">980 active visitors today</p>
            </div>
            <div className="w-full bg-sand-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[68%]" />
            </div>
          </div>
        </div>

        {/* ── MAIN DASHBOARD VIEWPORTS ── */}
        {(activeTab === 'overview' || activeTab === 'incidents') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Columns: 4 Clean & Structured Telemetry Charts */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Row 1 Charts: Category Donut & 7-Day Trend Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart 1: Issue Category Distribution */}
                <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-forest-950">Issue Category Breakdown</h3>
                      <p className="text-xs text-sand-500">Live breakdown by category type</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
                      Real-time
                    </span>
                  </div>

                  {pieData.length > 0 ? (
                    <div className="h-56 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              borderRadius: '16px',
                              backgroundColor: '#ffffff',
                              border: '1px solid #e5e1d5',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                              fontSize: '12px',
                              fontWeight: '700',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-56 flex items-center justify-center text-sm text-sand-400">
                      No reports registered
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-sand-100">
                    {pieData.map((entry, i) => (
                      <div key={entry.name} className="flex items-center gap-2 text-xs font-semibold text-sand-700">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <span className="truncate">{entry.name}</span>
                        <span className="font-extrabold text-forest-950 ml-auto">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: 7-Day Telemetry Trend Area Chart */}
                <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-forest-950">Weekly Telemetry Trends</h3>
                      <p className="text-xs text-sand-500">Incident creation vs resolution pace</p>
                    </div>
                    <span className="px-2.5 py-1 bg-sky-50 text-sky-800 rounded-lg text-xs font-bold border border-sky-200">
                      7-Day Window
                    </span>
                  </div>

                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#786c5e', fontWeight: 600 }} />
                        <YAxis tick={{ fontSize: 11, fill: '#786c5e', fontWeight: 600 }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e1d5',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px',
                          }}
                        />
                        <Area type="monotone" dataKey="reports" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReports)" name="Reports Submitted" />
                        <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" name="Issues Resolved" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between text-xs text-sand-500 pt-3 border-t border-sand-100">
                    <span className="flex items-center gap-1.5 text-red-600 font-bold">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full" /> Incidents Created
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Action Executed
                    </span>
                  </div>
                </div>

              </div>

              {/* Row 2 Charts: Hourly Visitor Density Bar Chart & Environmental Factor Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Chart 3: Hourly Visitor Density Bar Chart */}
                <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-forest-950">Hourly Footfall Density</h3>
                      <p className="text-xs text-sand-500">Visitor arrival & peak hours curve</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-bold border border-amber-200">
                      Peak: 2 PM
                    </span>
                  </div>

                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hourlyDensityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                        <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#786c5e', fontWeight: 600 }} />
                        <YAxis tick={{ fontSize: 11, fill: '#786c5e', fontWeight: 600 }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e1d5',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px',
                            fontWeight: '700',
                          }}
                        />
                        <Bar dataKey="visitors" name="Active Visitors" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between text-xs text-sand-500 pt-3 border-t border-sand-100">
                    <span className="font-semibold">Sanctuary Threshold: <strong>400 max/hr</strong></span>
                    <span className="text-emerald-700 font-bold">Capacity Controlled</span>
                  </div>
                </div>

                {/* Chart 4: Environmental Factor Breakdown */}
                <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-forest-950">Environmental Sub-Index</h3>
                      <p className="text-xs text-sand-500">Multifactored ecosystem performance</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
                      5 Audited
                    </span>
                  </div>

                  <div className="space-y-3.5 my-auto py-1">
                    {ecoFactors.map((item) => (
                      <div key={item.factor} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-forest-950">{item.factor}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-sand-500">{item.status}</span>
                            <span className="font-black text-forest-950">{item.score}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-sand-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-700', item.color)}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-sand-500 pt-3 border-t border-sand-100">
                    <span className="font-medium text-emerald-700">All factors within green safety limits</span>
                  </div>
                </div>

              </div>

              {/* Incidents Command Feed */}
              <div className="bg-white rounded-3xl border border-sand-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-100">
                  <div>
                    <h3 className="text-lg font-bold text-forest-950">Incident Management Stream</h3>
                    <p className="text-xs text-sand-600">Crowdsourced traveler field reports & ranger dispatch logs</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-sand-50 border border-sand-200 rounded-xl text-xs font-semibold text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 w-44"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['all', 'waste', 'overcrowding', 'infrastructure', 'accessibility'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all duration-150',
                        selectedCategoryFilter === cat
                          ? 'bg-forest-900 text-white shadow-xs'
                          : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-3.5">
                  {filteredReports.map((report) => (
                    <ReportCard
                      key={report.id}
                      id={report.id}
                      category={report.category}
                      description={report.description}
                      status={report.status}
                      priority={report.priority}
                      createdAt={report.createdAt}
                    />
                  ))}

                  {filteredReports.length === 0 && (
                    <div className="text-center py-12 bg-sand-50 rounded-2xl border border-sand-200/60 space-y-2">
                      <p className="text-sm font-bold text-forest-950">No matching incident reports</p>
                      <p className="text-xs text-sand-500">Try adjusting your search query or category filter.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right 4 Columns: AI Directives & Action Controls */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-sand-100">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-forest-950">AI Directives & Alerts</h3>
                    <p className="text-xs text-sand-500">Autonomous pattern analysis engine</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {destInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={cn(
                        'rounded-2xl p-4 border transition-all space-y-2.5',
                        insight.severity === 'critical'
                          ? 'bg-red-50/60 border-red-200'
                          : insight.severity === 'high'
                          ? 'bg-amber-50/60 border-amber-200'
                          : 'bg-blue-50/60 border-blue-200'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          'px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider',
                          insight.severity === 'critical' ? 'bg-red-200 text-red-900' :
                          insight.severity === 'high' ? 'bg-amber-200 text-amber-900' :
                          'bg-blue-200 text-blue-900'
                        )}>
                          {insight.type.replace('_', ' ')}
                        </span>
                        {insight.reportCount && (
                          <span className="text-[11px] font-bold text-sand-500">
                            {insight.reportCount} reports
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-forest-950 leading-snug">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-sand-700 leading-relaxed mt-1">
                          {insight.description}
                        </p>
                      </div>

                      {insight.trend && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-sand-600">
                          <TrendingUp className="w-3.5 h-3.5 text-forest-600" />
                          <span>Trend: {insight.trend}</span>
                        </div>
                      )}

                      <div className="bg-white/90 rounded-xl p-3 border border-sand-200/80 shadow-2xs">
                        <p className="text-[11px] font-bold text-forest-950 mb-0.5">💡 Recommended Action:</p>
                        <p className="text-xs text-forest-800 font-medium leading-relaxed">
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}

                  {destInsights.length === 0 && (
                    <p className="text-xs text-sand-500 text-center py-6">All systems normal. No active anomalies.</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-sand-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sand-100">
                  <h3 className="text-base font-bold text-forest-950">Priority Ranger Directives</h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    4 Active
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { text: 'Deploy waste collection team near Sunset Point & Echo Point viewpoints', priority: 'high', tag: 'Waste Control' },
                    { text: 'Broadcast push notification to promote Panorama Trail alternative', priority: 'medium', tag: 'Crowd Flow' },
                    { text: 'Audit accessibility ramp and tactile path at north toy train entrance', priority: 'high', tag: 'Accessibility' },
                    { text: 'Maintenance dispatch for water refill station #3 near central market', priority: 'medium', tag: 'Infrastructure' },
                  ].map((action, i) => (
                    <div key={i} className="p-3.5 bg-sand-50 hover:bg-sand-100/80 rounded-2xl border border-sand-200/60 flex items-start gap-3 transition-colors">
                      <span className={cn(
                        'w-2.5 h-2.5 rounded-full mt-1.5 shrink-0',
                        action.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
                      )} />
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold text-forest-950 leading-snug">{action.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-sand-500 uppercase">{action.tag}</span>
                          <span className="text-[10px] font-bold text-sand-400">• {action.priority} priority</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-forest-900 to-forest-950 text-white rounded-3xl p-6 shadow-lg border border-forest-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    🌿
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ecosystem Capacity Status</h4>
                    <p className="text-xs text-forest-200">{destination.name} Sanctuary</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-forest-300">Carrying Capacity</span>
                    <span className="font-bold text-emerald-400">Within Threshold (68%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-forest-300">Water Network Demand</span>
                    <span className="font-bold text-amber-300">High (Peak Hours)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-forest-300">Trail Erosion Risk</span>
                    <span className="font-bold text-emerald-400">Low Risk</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Broadcasting crowd dispersal advisory for ${destination.name}`)}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-forest-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Broadcast Crowd Advisory
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}
