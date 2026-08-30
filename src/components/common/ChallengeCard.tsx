import { Link } from 'react-router-dom'
import { cn, getDifficultyColor } from '@/lib/utils'
import { Clock, Zap, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react'

interface ChallengeCardProps {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  points: number
  estimatedMinutes: number
  isCompleted?: boolean
  isRecommended?: boolean
  className?: string
}

export function ChallengeCard({
  id,
  title,
  description,
  icon,
  difficulty,
  points,
  estimatedMinutes,
  isCompleted,
  isRecommended,
  className,
}: ChallengeCardProps) {
  return (
    <Link
      to={`/challenges/${id}`}
      className={cn(
        'group relative block bg-white rounded-2xl border border-sand-200 p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300',
        isCompleted && 'opacity-80 bg-forest-50/30 border-forest-200/60',
        isRecommended && 'ring-2 ring-forest-500 ring-offset-2 shadow-lg shadow-forest-600/10',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-13 h-13 bg-forest-50 border border-forest-100 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 group-hover:bg-forest-100 transition-all shadow-sm">
          {icon}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-bold text-forest-900 text-base group-hover:text-forest-700 transition-colors">
              {title}
            </h3>
            {isRecommended && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-forest-100 text-forest-800 text-xs font-bold rounded-full border border-forest-200 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Recommended
              </span>
            )}
          </div>

          <p className="text-sm text-sand-700 leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className={cn('px-2.5 py-1 rounded-full font-semibold capitalize', getDifficultyColor(difficulty))}>
              {difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-sand-600 font-medium bg-sand-50 px-2.5 py-1 rounded-full border border-sand-200/60">
              <Clock className="w-3.5 h-3.5 text-sand-400" />
              {estimatedMinutes} mins
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200/60">
              <Zap className="w-3.5 h-3.5 fill-current" />
              +{points} pts
            </span>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="w-8 h-8 rounded-full bg-sand-50 flex items-center justify-center group-hover:bg-forest-100 group-hover:text-forest-700 text-sand-400 transition-all shrink-0 mt-1">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Completed Banner */}
      {isCompleted && (
        <div className="mt-3.5 pt-3 border-t border-forest-100 flex items-center gap-2 text-sm font-semibold text-forest-700">
          <CheckCircle2 className="w-4 h-4 text-forest-600" />
          <span>Challenge Completed & Verified</span>
        </div>
      )}
    </Link>
  )
}
