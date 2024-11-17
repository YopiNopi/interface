"use client"

import React from 'react'
import { Wallet, Trophy, History, Scale, Gift, Users } from 'lucide-react'
import { Market } from '@/types/market'
import { TelegramLogin } from '@/components/TelegramLogin';


// Sample data using the Market type structure
const recentBets = [
  {
    id: "1",
    market: {
      id: "btc-100k",
      question_text: "Will BTC reach $100k by end of 2024?",
      end_time: "2024-12-31",
      extra_info: {
        token: "BTC"
      }
    },
    points: 50,
    vote: "Yes",
    status: "pending",
    date: "2024-02-20"
  },
  {
    id: "2",
    market: {
      id: "eth-merge",
      question_text: "Will ETH merge happen in March?",
      end_time: "2024-03-31",
      extra_info: {
        token: "ETH"
      }
    },
    points: 30,
    vote: "No",
    status: "won",
    date: "2024-02-19"
  },
  {
    id: "3",
    market: {
      id: "doge-1usd",
      question_text: "Will DOGE reach $1?",
      end_time: "2024-06-30",
      extra_info: {
        token: "DOGE"
      }
    },
    points: 20,
    vote: "Yes",
    status: "lost",
    date: "2024-02-18"
  }
]

// Update the open positions type and sample data
type OpenPosition = {
  id: string;
  market: Market;
  points: number;
  vote: "Yes" | "No";
  potential_win: number;
  status: "active" | "won" | "lost";
  redeemable: boolean;
}

// Update sample data
const openPositions: OpenPosition[] = [
  {
    id: "1",
    market: {
      id: "eth-pos",
      question_text: "ETH to flip BTC in 2024?",
      end_time: "2024-12-31",
      extra_info: { token: "ETH" }
    },
    points: 75,
    vote: "Yes",
    potential_win: 150,
    status: "active",
    redeemable: false
  },
  {
    id: "2",
    market: {
      id: "sol-pos",
      question_text: "SOL to reach $500?",
      end_time: "2024-01-30", // Past date
      extra_info: { token: "SOL" }
    },
    points: 100,
    vote: "No",
    potential_win: 200,
    status: "won",
    redeemable: true
  }
]

// Add this type and sample data after other sample data
type Claim = {
  id: string;
  amount: number;
  source: "market" | "quest" | "referral";
  description: string;
  date: string;
}

const recentClaims: Claim[] = [
  {
    id: "1",
    amount: 150,
    source: "market",
    description: "ETH to reach $3000",
    date: "2024-02-20"
  },
  {
    id: "2",
    amount: 50,
    source: "quest",
    description: "Daily Login Streak",
    date: "2024-02-19"
  },
  {
    id: "3",
    amount: 100,
    source: "referral",
    description: "Referral Bonus",
    date: "2024-02-18"
  }
];

// Add this after other constants
const positionGradients = [
  "from-blue-100 via-indigo-100 to-violet-100",
  "from-fuchsia-100 via-pink-100 to-rose-100",
  "from-amber-100 via-orange-100 to-red-100",
  "from-emerald-100 via-green-100 to-teal-100",
  "from-cyan-100 via-sky-100 to-blue-100",
];

const getPositionGradient = (index: number) => {
  return positionGradients[index % positionGradients.length];
};

const ProfileContent: React.FC = () => {
  const user = {
    username: "CryptoWhale",
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=CryptoWhale"
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-28 px-4 pt-8">
      <div className="w-full max-w-[368px] space-y-6">



        <TelegramLogin />

        {/* Stats Cards with Dark Theme */}
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4">
          <div className="grid grid-cols-2 divide-x divide-gray-700">
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">1,250</div>
              <div className="text-xs text-gray-400">Available Points</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">2,500</div>
              <div className="text-xs text-gray-400">Total Earned</div>
            </div>
          </div>
        </div>

        {/* Open Positions Section with Refined Design */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-lg">
                <Scale className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Open Positions</h2>
            </div>
          </div>

          <div className="p-2">
            {openPositions.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No open positions yet
              </div>
            ) : (
              openPositions.slice(0, 3).map((position, index) => (
                <div
                  key={position.id}
                  className={`
                    relative overflow-hidden p-4 rounded-xl transition-all duration-300 
                    hover:shadow-md border border-gray-100 mb-2 last:mb-0
                    bg-gradient-to-br ${getPositionGradient(index)}
                  `}
                >
                  {/* Market Info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        {position.market.extra_info?.token && (
                          <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-800 text-white">
                            {position.market.extra_info.token}
                          </span>
                        )}
                        <span className={`
                          px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm
                          ${position.status === 'active' ? 'bg-blue-500/10 text-blue-700' :
                            position.status === 'won' ? 'bg-emerald-500/10 text-emerald-700' :
                              'bg-red-500/10 text-red-700'}
                        `}>
                          {position.status === 'active' ? 'In Progress' :
                            position.status === 'won' ? 'Won' : 'Lost'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {position.market.question_text}
                      </p>
                    </div>
                    {/* Move claim button here for won positions */}
                    {position.redeemable && (
                      <button
                        onClick={() => {
                          console.log(`Redeeming ${position.potential_win} points from market ${position.market.id}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        Claim {position.potential_win} pts
                      </button>
                    )}
                  </div>

                  {/* Position Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Your Prediction */}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-0.5">Your Prediction</span>
                        <div className={`
                          px-2 py-1 rounded-lg text-xs font-semibold
                          ${position.vote === 'Yes' ?
                            'bg-green-500/10 text-green-700' :
                            'bg-red-500/10 text-red-700'}
                        `}>
                          {position.vote}
                        </div>
                      </div>

                      {/* Points Staked */}
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-0.5">Points Staked</span>
                        <div className="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-500/10 text-gray-700">
                          {position.points} pts
                        </div>
                      </div>
                    </div>

                    {/* Potential Win or Result */}
                    <div>
                      {position.status === 'active' ? (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500 mb-0.5">Potential Win</span>
                          <div className="px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700">
                            +{position.potential_win} pts
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500 mb-0.5">Result</span>
                          <div className={`
                            px-2 py-1 rounded-lg text-xs font-semibold
                            ${position.status === 'won' ?
                              'bg-emerald-500/10 text-emerald-700' :
                              'bg-red-500/10 text-red-700'}
                          `}>
                            {position.status === 'won' ?
                              `+${position.potential_win} pts` :
                              'No win'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bets Section with Refined Design */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 rounded-lg">
                <History className="w-4 h-4 text-pink-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Recent Bets</h2>
            </div>
          </div>

          <div className="p-2">
            {recentBets.map((bet) => (
              <div
                key={bet.id}
                className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {bet.market.question_text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(bet.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {bet.market.extra_info?.token && (
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
                          {bet.market.extra_info.token}
                        </span>
                      )}
                      <span className={`
                        px-1.5 py-0.5 rounded-full text-xs font-medium
                        ${bet.vote === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                      `}>
                        {bet.vote}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-800">
                      {bet.points} pts
                    </span>
                    <span className={`text-xs font-medium
                      ${bet.status === 'won' ? 'text-green-600' :
                        bet.status === 'lost' ? 'text-red-600' :
                          'text-gray-500'}
                    `}>
                      {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg">
                <Trophy className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Recent Claims</h2>
            </div>
          </div>

          <div className="p-2">
            {recentClaims.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No claims yet
              </div>
            ) : (
              recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${claim.source === 'market' ? 'bg-blue-100' :
                          claim.source === 'quest' ? 'bg-purple-100' :
                            'bg-pink-100'}
                      `}>
                        {claim.source === 'market' ? (
                          <Scale className={`w-4 h-4 text-blue-600`} />
                        ) : claim.source === 'quest' ? (
                          <Gift className={`w-4 h-4 text-purple-600`} />
                        ) : (
                          <Users className={`w-4 h-4 text-pink-600`} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {claim.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(claim.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className={`
                            px-1.5 py-0.5 rounded-full text-xs font-medium
                            ${claim.source === 'market' ? 'bg-blue-100 text-blue-700' :
                              claim.source === 'quest' ? 'bg-purple-100 text-purple-700' :
                                'bg-pink-100 text-pink-700'}
                          `}>
                            {claim.source.charAt(0).toUpperCase() + claim.source.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-emerald-600">
                        +{claim.amount} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent 