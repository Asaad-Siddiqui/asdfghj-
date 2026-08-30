import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Bell, Menu, X, MapPin, Compass, Sparkles, Trophy, LayoutDashboard, Shield, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const { user, notifications } = useApp()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const navItems = [
    { to: '/home', label: 'Home', icon: Compass },
    { to: '/destinations', label: 'Explore', icon: MapPin },
    { to: '/trip-planner', label: 'AI Planner', icon: Sparkles },
    { to: '/challenges', label: 'Challenges', icon: Trophy },
    { to: '/impact', label: 'My Impact', icon: null },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-sand-200/60 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-800 rounded-2xl flex items-center justify-center shadow-md shadow-forest-700/20 group-hover:scale-105 group-hover:shadow-forest-700/30 transition-all">
              <span className="text-white font-black text-lg tracking-tight">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-forest-900 tracking-tight leading-none group-hover:text-forest-700 transition-colors">
                TRAVELLO
              </span>
              <span className="text-[10px] font-bold text-forest-600 tracking-wider uppercase">
                Green & Inclusive
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-sand-200/70 p-1.5 shadow-2xs">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to || (item.to !== '/home' && location.pathname.startsWith(item.to))
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-forest-700 text-white shadow-sm shadow-forest-800/20'
                      : 'text-sand-700 hover:text-forest-800 hover:bg-forest-50/80'
                  )}
                >
                  {Icon && <Icon className={cn('w-4 h-4', isActive ? 'text-emerald-300' : 'text-sand-400')} />}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Role indicator badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 border border-forest-200/80 rounded-xl text-xs font-bold text-forest-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="capitalize">{user.role} Mode</span>
            </div>

            {/* Notifications Button */}
            <button className="relative p-2.5 text-sand-600 hover:text-forest-800 hover:bg-white/90 rounded-xl transition-all border border-transparent hover:border-sand-200">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute 1 top-1.5 right-1.5 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 p-1 pr-3 bg-white/80 border border-sand-200 rounded-2xl hover:border-forest-300 transition-all shadow-2xs group"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-forest-500/20 group-hover:ring-forest-500/40 transition-all">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-forest-900 leading-tight group-hover:text-forest-700 transition-colors">
                  {user.displayName.split(' ')[0]}
                </p>
                <p className="text-[10px] font-semibold text-emerald-700">
                  {user.impactPoints} pts
                </p>
              </div>
            </Link>

            {/* Mobile menu hamburger */}
            <button
              className="lg:hidden p-2.5 text-sand-600 hover:text-forest-800 hover:bg-white rounded-xl transition-all border border-sand-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sand-200/70 bg-white/98 backdrop-blur-2xl animate-slide-down shadow-xl">
          <div className="px-4 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to || (item.to !== '/home' && location.pathname.startsWith(item.to))
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-forest-700 text-white'
                      : 'text-sand-700 hover:bg-sand-100'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon && <Icon className={cn('w-5 h-5', isActive ? 'text-emerald-300' : 'text-sand-400')} />}
                  {item.label}
                </Link>
              )
            })}
            
            <div className="pt-2 border-t border-sand-200 mt-2">
              <Link
                to="/profile"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-sand-700 hover:bg-sand-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>My Profile & Settings</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold">
                  {user.impactPoints} pts
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
