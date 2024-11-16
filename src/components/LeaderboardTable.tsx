import React from 'react'
import { Star } from 'lucide-react'
import { cn } from "@/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Player = {
  id: string
  highestPoints: string
  username: string
  wonCount: number
  lostCount: number
  image: string
}

interface LeaderboardTableProps {
  players: Player[];
  currentUser: string;
  renderPrizeLabel?: (rank: number) => React.ReactNode;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ players, currentUser, renderPrizeLabel }) => {
  if (!players.length) {
    return (
      <div className="w-full max-w-[368px] text-center text-gray-500">
        No players yet
      </div>
    );
  }

  return (
    <div className="w-full max-w-[368px]">
      {players.map((player, index) => {
        const isCurrentUser = player.username === currentUser;
        return (
          <div
            key={player.id}
            className={cn(
              "flex items-center justify-between h-[68px] py-3 px-3 border-b border-gray-200 last:border-b-0 transition-colors",
              isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center font-medium text-xs",
                index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-amber-600 text-white' :
                      'bg-gray-100 text-gray-600 border border-gray-200',
                "mr-3"
              )}>
                {index + 1}
              </div>
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src={player.image} alt={player.username} />
                <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">{player.username}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 min-h-[1.25rem]">
                  {renderPrizeLabel && renderPrizeLabel(index + 1)}
                  <span>{player.wonCount}W - {player.lostCount}L</span>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium">
              {player.highestPoints} pts
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LeaderboardTable 