import React from 'react'
import { cn } from "@/utils/cn"

interface PlayerCardProps {
  currentUserData: any;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ currentUserData }) => {
  if (!currentUserData) return null;

  // Calculate win rate
  const wins = currentUserData.wonCount || 0;
  const losses = currentUserData.lostCount || 0;
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  return (
    <div className="w-full max-w-[368px] bg-gradient-to-r from-fuchsia-600 to-purple-700 rounded-2xl p-4 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-fuchsia-200">Your Current Rank</div>
          <div className="text-4xl font-bold">{currentUserData.rank || 0}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-fuchsia-200">Total Points</div>
          <div className="text-4xl font-bold">{currentUserData.points || 0}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full h-1 bg-fuchsia-400/30 rounded-full">
          <div className="h-1 bg-fuchsia-200 rounded-full" style={{ width: `${winRate}%` }} />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-fuchsia-200">
          <div>Wins: {wins}</div>
          <div>Losses: {losses}</div>
          <div>Win Rate: {winRate}%</div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard 