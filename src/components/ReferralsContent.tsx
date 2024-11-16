"use client"

import { Button } from "@/components/ui/button"
import { Share2, Gift, ArrowRight } from 'lucide-react'

interface ReferralsContentProps { }
const ReferralsContent: React.FC<ReferralsContentProps> = () => {
  const urlToShare = process.env.NEXT_PUBLIC_TG_APP_URL + '?startapp=mycode';
  const shareMessage = "Hey, Join YopiNope!";
  const telegramDeepLink = `https://t.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-28 px-4 pt-8">
      <div className="w-full max-w-[368px] space-y-6">
        {/* Header with Gradient Text */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            Invite & Earn
          </h1>
          <p className="text-sm text-gray-600">Share the excitement with friends</p>
        </div>

        {/* Stats Card - Moved to top */}
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4">
          <div className="grid grid-cols-2 divide-x divide-gray-700">
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-xs text-gray-400">Total Referrals</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-xs text-gray-400">Points Earned</div>
            </div>
          </div>
        </div>

        {/* Main Referral Card */}
        <div className="relative overflow-hidden">
          {/* Content */}
          <div className="relative rounded-3xl bg-white border border-gray-100 p-6 space-y-6">
            {/* Referral Code Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Your Referral Code</p>
                <h2 className="text-2xl font-bold font-mono tracking-wider text-gray-800">mycode</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Rewards Preview */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Rewards Preview</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-lg font-bold text-gray-800">100</div>
                  <div className="text-xs text-gray-600">Points per Referral</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-lg font-bold text-gray-800">5%</div>
                  <div className="text-xs text-gray-600">Extra Earnings</div>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <a
              href={telegramDeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 shadow-lg shadow-purple-500/20">
                Share on Telegram
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralsContent;
