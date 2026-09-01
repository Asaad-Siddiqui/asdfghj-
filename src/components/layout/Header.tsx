import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Bell, Menu, X, Leaf, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const { user, notifications } = useApp()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/trip-planner', label: 'Plan Trip' },
    { to: '/challenges', label: 'Eco-Challenges' },
    { to: '/reports/new', label: 'Reports' },
    { to: '/destinations?filter=accessible', label: 'Accessibility' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-sand-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-current text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-forest-950 tracking-tight leading-none font-sans-ui">
                TRAVELLO
              </span>
              <span className="text-[9px] font-bold text-forest-600 tracking-wider uppercase mt-0.5">
                GREEN & INCLUSIVE TRAVEL
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive =
                (item.to === '/dashboard' && (location.pathname === '/dashboard' || location.pathname === '/home')) ||
                (item.to !== '/dashboard' && location.pathname.startsWith(item.to.split('?')[0]))

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-forest-50 text-forest-900 border border-forest-200/80 font-bold shadow-2xs'
                      : 'text-sand-700 hover:text-forest-900 hover:bg-sand-100/60'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Bell Notifications */}
            <button className="relative p-2.5 text-sand-700 hover:text-forest-950 hover:bg-sand-100 rounded-full transition-all border border-sand-200/60">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 pr-2.5 bg-sand-50 hover:bg-sand-100/80 border border-sand-200 rounded-full transition-all shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-emerald-500/30">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold">
                    {user.displayName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-xs font-bold text-forest-950">
                  Hi, {user.displayName ? user.displayName.split(' ')[0] : 'Ananya'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-sand-500 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </Link>

            {/* Green Circular Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-full transition-all shadow-sm"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sand-200 bg-white shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-forest-950 hover:bg-forest-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
