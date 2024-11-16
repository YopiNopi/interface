"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'

interface ReferralsContentProps { }
const ReferralsContent: React.FC<ReferralsContentProps> = () => {

  const urlToShare = process.env.NEXT_PUBLIC_TG_APP_URL + '?startapp=mycode' ;
  const shareMessage = "Hey, Join YopiNope!";
  const telegramDeepLink = `https://t.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(shareMessage)}`;


  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-28 px-4 pt-8">
      <div className="w-full max-w-[368px]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Play with Frens</h1>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-md mb-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Share2 className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">Invite Friends</h2>
            </div>
            <div className="bg-white bg-opacity-20 rounded-md px-2 py-1">
              <span className="font-mono text-sm">{'mycode'}</span>
            </div>
          </div>
          <p className="text-sm mb-3 opacity-90">
            Share your code and earn rewards!
          </p>

          <a
            href={telegramDeepLink} target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-200 text-sm"
            >Share to Telegram</Button>
          </a>


        </div>

      </div>
    </div>
  )
}

export default ReferralsContent;
