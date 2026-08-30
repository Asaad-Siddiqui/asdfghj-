import { useState } from 'react'
import { socialPosts } from '@/data/mock-data'
import { Heart, MessageCircle, Bookmark, Share2, MapPin, Trophy, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SocialPage() {
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() =>
    socialPosts.reduce((acc, p) => {
      acc[p.id] = { count: p.likes, liked: false }
      return acc
    }, {} as Record<string, { count: number; liked: boolean }>)
  )

  const toggleLike = (id: string) => {
    setLikesState((prev) => {
      const current = prev[id] || { count: 0, liked: false }
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
            <Users className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-forest-900 tracking-tight">
            Conscious Travelers Community
          </h1>
        </div>
        <p className="text-sm sm:text-base text-sand-600">
          Discover verified trail journeys, eco-achievements, and sustainable travel inspiration.
        </p>
      </div>

      <div className="space-y-6">
        {socialPosts.map((post) => {
          const currentLike = likesState[post.id] || { count: post.likes, liked: false }
          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between p-5 pb-4">
                <div className="flex items-center gap-3.5">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-forest-700 rounded-full flex items-center justify-center text-white text-base font-bold">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-forest-900 leading-snug">{post.author.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-sand-500 font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {post.destination}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Verified Trip
                </span>
              </div>

              {/* Caption */}
              <div className="px-5 pb-3">
                <p className="text-sm sm:text-base text-sand-800 leading-relaxed">{post.caption}</p>
              </div>

              {/* Challenge Badge Banner */}
              {post.challengeCompletion && (
                <div className="mx-5 mb-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-950 block">Mission Accomplished</span>
                    <span className="text-xs sm:text-sm text-emerald-800 font-bold">
                      {post.challengeCompletion.challengeName} (+{post.challengeCompletion.points} pts)
                    </span>
                  </div>
                </div>
              )}

              {/* High-res Image */}
              {post.imageUrl ? (
                <div className="relative h-72 sm:h-96 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="h-64 bg-sand-100 flex items-center justify-center text-4xl">
                  📸
                </div>
              )}

              {/* Social Action Bar */}
              <div className="flex items-center justify-between p-4 px-5 border-t border-sand-100 bg-sand-50/50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
                      currentLike.liked
                        ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                        : 'text-sand-700 hover:bg-sand-100 hover:text-red-600'
                    )}
                  >
                    <Heart className={cn('w-4 h-4', currentLike.liked && 'fill-current text-red-600')} />
                    {currentLike.count}
                  </button>

                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-sand-700 hover:bg-sand-100 hover:text-blue-600 transition-all cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Post bookmarked to saved eco itineraries!')}
                    className="p-2 text-sand-500 hover:text-amber-600 hover:bg-sand-100 rounded-xl transition-all cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert('Post share link copied!')}
                    className="p-2 text-sand-500 hover:text-emerald-700 hover:bg-sand-100 rounded-xl transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
