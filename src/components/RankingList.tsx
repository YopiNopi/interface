"use client"

import React, { useMemo } from 'react'
import { Star } from 'lucide-react'
import { cn } from "@/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Player = {
  id: number
  name: string
  wins: number
  losses: number
  avatar: string
}

export default function RankingList() {
  const currentUser = "Jack Sparrow"

  const dummyRankings: Player[] = [
    { id: 1, name: "Admiral Ackbar", wins: 15, losses: 3, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Admiral" },
    { id: 2, name: "Captain Nemo", wins: 12, losses: 5, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Nemo" },
    { id: 3, name: "Sailor Moon", wins: 10, losses: 7, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Moon" },
    { id: 4, name: "Popeye", wins: 8, losses: 9, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Popeye" },
    { id: 5, name: "Jack Sparrow", wins: 7, losses: 10, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Sparrow" },
    { id: 6, name: "Moby Dick", wins: 5, losses: 12, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Moby" },
    { id: 7, name: "Aquaman", wins: 3, losses: 15, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=Aquaman" },
    { id: 8, name: "Player 8", wins: 8, losses: 8, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=8" },
    { id: 9, name: "Player 9", wins: 7, losses: 9, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=9" },
    { id: 10, name: "Player 10", wins: 6, losses: 10, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=10" },
    { id: 11, name: "Player 11", wins: 5, losses: 11, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=11" },
    { id: 12, name: "Player 12", wins: 4, losses: 12, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=12" },
    { id: 13, name: "Player 13", wins: 3, losses: 13, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=13" },
    { id: 14, name: "Player 14", wins: 2, losses: 14, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=14" },
    { id: 15, name: "Player 15", wins: 1, losses: 15, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=15" },
    { id: 16, name: "Player 16", wins: 0, losses: 16, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=16" },
    { id: 17, name: "Player 17", wins: 4, losses: 13, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=17" },
    { id: 18, name: "Player 18", wins: 5, losses: 12, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=18" },
    { id: 19, name: "Player 19", wins: 6, losses: 11, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=19" },
    { id: 20, name: "Player 20", wins: 7, losses: 10, avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=20" },
  ]

  const calculatePoints = (wins: number, losses: number) => {
    return wins * 3 - losses
  }

  const sortedPlayers = useMemo(() => {
    return [...dummyRankings].sort((a, b) => {
      const pointsA = calculatePoints(a.wins, a.losses)
      const pointsB = calculatePoints(b.wins, b.losses)
      return pointsB - pointsA
    }).slice(0, 20)
  }, [])

  const currentUserData = dummyRankings.find(player => player.name === currentUser)
  const currentUserRank = sortedPlayers.findIndex(player => player.name === currentUser) + 1
  const currentUserPoints = currentUserData ? calculatePoints(currentUserData.wins, currentUserData.losses) : 0
  const winRate = currentUserData ? (currentUserData.wins / (currentUserData.wins + currentUserData.losses)) * 100 : 0

  return (
    <ScrollArea className="w-full h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center justify-start bg-[#FBF7EF] pb-28 px-1 pt-4">
        <div className="w-full max-w-[368px] mb-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-95" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-black text-white tracking-tight">
                    #{currentUserRank}
                  </div>
                  <div className="text-[10px] font-medium text-white/80">
                    Current Rank
                  </div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="flex flex-col">
                  <div className="text-xl font-bold text-white">
                    {currentUserPoints}
                  </div>
                  <div className="text-[10px] font-medium text-white/80">
                    Total Points
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-white/90">Wins</span>
                  </div>
                  <div className="mt-0.5 text-lg font-bold text-white">
                    {currentUserData?.wins || 0}
                  </div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span className="text-xs font-medium text-white/90">Losses</span>
                  </div>
                  <div className="mt-0.5 text-lg font-bold text-white">
                    {currentUserData?.losses || 0}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-medium text-white/80">Win Rate</span>
                  <span className="text-[10px] font-bold text-white">{winRate.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${winRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[368px]">
          {sortedPlayers.map((player, index) => {
            const points = calculatePoints(player.wins, player.losses)
            const isCurrentUser = player.name === currentUser
            return (
              <div
                key={player.id}
                className={cn(
                  "flex items-center justify-between py-3 px-3 border-b border-gray-200 last:border-b-0 transition-colors",
                  isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'
                )}
              >
                <div className="flex items-center">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center font-medium text-xs",
                    index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' :
                          'bg-gray-100 text-gray-600',
                    "mr-3"
                  )}>
                    {index + 1}
                  </div>
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{player.name}</div>
                    <div className="text-xs text-gray-500">
                      {player.wins}W - {player.losses}L
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-sm">{points} pts</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ScrollArea>
  )
}