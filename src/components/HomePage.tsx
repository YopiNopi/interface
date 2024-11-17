"use client"

import React, { useEffect, useCallback, useState } from 'react'
import useGlobal from '@/hooks/useGlobal';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';
import { Users, Bot, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { getActiveMarkets } from '@/utils/api';
import { TelegramLogin } from '@/components/TelegramLogin';

interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = () => {
    const [markets, setMarkets] = useState([]);
    const globalState = useGlobal();
    useEffect(() => {
        const fetchData = async () => {
            getMarkets();
        };

        fetchData();
    }, []);

    const getMarkets = async () => {
        console.log('getMarkets', markets.length);
        if (markets.length > 0) return;
        const response = await getActiveMarkets();
        console.log("response", response.items);
        setMarkets(response.items);
    }

    if (!markets.length) {
        return (
            <div className="w-full max-w-[368px] text-center text-gray-500">
                Loading Markets...
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center min-h-screen bg-[#FBF7EF] pb-28 pt-16">
            <div className="w-full max-w-[368px] px-4 space-y-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Welcome</h1>
                        <p className="text-gray-600 mt-2">Sign in to continue</p>
                    </div>
                    <TelegramLogin />
                </div>

                {/* Header Section */}
                <div className="relative space-y-3 text-center pb-2">
                    <div className="relative transform">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                        <h1 className="relative text-5xl font-black bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-purple-600 text-transparent bg-clip-text tracking-tight drop-shadow-sm">
                            YopiNopi
                        </h1>
                    </div>
                    <div className="relative">
                        <p className="text-gray-600 text-xs font-medium mt-0.5 tracking-wider">
                            Bet on the future
                        </p>
                        <div className="absolute left-1/2 -bottom-4 w-20 h-[2px] bg-gradient-to-r from-indigo-500/0 via-purple-500/50 to-indigo-500/0 transform -translate-x-1/2" />
                    </div>
                </div>

                {/* Markets Section */}
                <div className="grid">
                    <div>
                        {markets[0]?.question_text}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomePage