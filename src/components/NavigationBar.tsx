"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserCircle2, Heart, Trophy, Gift, Users } from 'lucide-react'

type Page = 'profile' | 'ranking' | 'game' | 'quests' | 'referrals'

const getIcon = (page: Page, isActive: boolean) => {
  const iconProps = {
    className: `w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`,
    strokeWidth: isActive ? 2.5 : 2
  }

  switch (page) {
    case 'profile': return <UserCircle2 {...iconProps} />
    case 'referrals': return <Users {...iconProps} />
    case 'game': return <Heart {...iconProps} />
    case 'ranking': return <Trophy {...iconProps} />
    case 'quests': return <Gift {...iconProps} />
  }
}

const getGradient = (page: Page) => {
  switch (page) {
    case 'profile': return 'from-violet-500 to-indigo-500'
    case 'referrals': return 'from-purple-500 to-pink-500'
    case 'game': return 'from-emerald-500 to-teal-500'
    case 'ranking': return 'from-amber-500 to-orange-500'
    case 'quests': return 'from-pink-500 to-rose-500'
  }
}

export default function NavigationBar() {
  const pathname = usePathname()
  const currentPage: Page = 
    pathname === '/' ? 'game' :
    pathname === '/ranking' ? 'ranking' :
    pathname === '/profile' ? 'profile' :
    pathname === '/quests' ? 'quests' :
    pathname === '/referrals' ? 'referrals' :
    'game'

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-gray-900/90 backdrop-blur-lg shadow-lg border border-gray-800">
        {(['profile', 'referrals', 'game', 'ranking', 'quests'] as const).map((page) => {
          const isActive = currentPage === page;
          return (
            <Link 
              key={page}
              href={page === 'game' ? '/' : `/${page}`}
              className="relative" 
            >
              <div className={`
                relative z-10 p-3 rounded-xl transition-all duration-300 
                ${isActive ? 'scale-110' : 'scale-100'}
              `}>
                {/* Active Gradient Background */}
                {isActive && (
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-r ${getGradient(page)}
                    shadow-lg
                  `} />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  {getIcon(page, isActive)}
                </div>

                {/* Active Glow Effect */}
                {isActive && (
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-r ${getGradient(page)}
                    opacity-50 blur-xl -z-10
                  `} />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
