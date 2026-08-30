import { Link, useLocation } from 'react-router-dom'
import { Compass, MapPin, Trophy, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/home', label: 'Home', icon: Compass },
  { to: '/destinations', label: 'Explore', icon: MapPin },
  { to: '/trip-planner', label: 'AI Plan', icon: Sparkles },
  { to: '/challenges', label: 'Challenges', icon: Trophy },
  { to: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass bg-white/90 backdrop-blur-xl border-t border-sand-200/80 shadow-lg">
      <div className="flex items-center justify-around h-16 px-3 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to || (item.to !== '/home' && location.pathname.startsWith(item.to))
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 min-w-[56px]',
                isActive
                  ? 'text-forest-800 font-bold bg-forest-100/80 scale-105'
                  : 'text-sand-600 font-medium hover:text-forest-700'
              )}
            >
              <Icon className={cn('w-5 h-5 transition-transform', isActive && 'text-forest-700 stroke-[2.5]')} />
              <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
