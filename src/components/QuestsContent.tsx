"use client"

import React from 'react'
import { Trophy, Star, Sparkles, Rocket, Target, ArrowRight } from 'lucide-react'

// Sample data - replace with actual data structure
const quests = [
  {
    id: 1,
    title: "First Steps",
    description: "Make your first 3 predictions",
    reward: "50",
    progress: 1,
    total: 3,
    type: "daily",
    icon: Rocket
  },
  {
    id: 2,
    title: "Winning Streak",
    description: "Get 5 predictions right",
    reward: "100",
    progress: 3,
    total: 5,
    type: "weekly",
    icon: Star
  },
  {
    id: 3,
    title: "Social Butterfly",
    description: "Invite 3 friends",
    reward: "200",
    progress: 0,
    total: 3,
    type: "special",
    icon: Sparkles
  }
]

const QuestsContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-28 px-4 pt-8">
      <div className="w-full max-w-[368px] space-y-6">
        {/* Header with Gradient Text */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-transparent bg-clip-text">
            Daily Quests
          </h1>
          <p className="text-sm text-gray-600">Complete quests to earn rewards</p>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4">
          <div className="grid grid-cols-2 divide-x divide-gray-700">
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">2/6</div>
              <div className="text-xs text-gray-400">Quests Completed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">150</div>
              <div className="text-xs text-gray-400">Points Earned</div>
            </div>
          </div>
        </div>

        {/* Quests List */}
        <div className="space-y-4">
          {quests.map((quest) => (
            <div 
              key={quest.id}
              className="relative overflow-hidden"
            >
              <div className="relative bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
                {/* Quest Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${quest.type === 'daily' ? 'bg-blue-500' :
                        quest.type === 'weekly' ? 'bg-purple-500' :
                        'bg-gradient-to-r from-orange-500 to-pink-500'}
                    `}>
                      <quest.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{quest.title}</h3>
                      <p className="text-xs text-gray-500">{quest.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                    <Trophy className="w-3 h-3 text-amber-600" />
                    <span className="text-xs font-medium text-amber-600">+{quest.reward}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{quest.progress}/{quest.total}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        quest.type === 'daily' ? 'bg-blue-500' :
                        quest.type === 'weekly' ? 'bg-purple-500' :
                        'bg-gradient-to-r from-orange-500 to-pink-500'
                      }`}
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Claim Button - show only if progress is complete */}
                {quest.progress === quest.total && (
                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                    Claim Reward
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestsContent