"use client"

import React, { useEffect, useState } from 'react'
import useGlobal from '@/hooks/useGlobal';
import { motion, PanInfo, useAnimation, AnimatePresence } from 'framer-motion';
import { getActiveMarkets } from '@/utils/api';
import { Check, X, Loader2, Minus, Plus } from 'lucide-react';
import { Market } from '@/types/market';
import { formatTimeRemaining } from '@/utils/dateFormat';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const swipeConfidenceThreshold = 10000;
const swipeThreshold = 100;

const swipeVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        rotate: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        x: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        rotate: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.3
        }
    })
};

const cardGradients = [
    "from-purple-100 via-indigo-200 to-pink-100",
    "from-blue-100 via-cyan-200 to-teal-100",
    "from-rose-100 via-orange-200 to-amber-100",
    "from-emerald-100 via-green-200 to-lime-100",
    "from-fuchsia-100 via-pink-200 to-rose-100",
    "from-sky-100 via-blue-200 to-indigo-100",
    "from-amber-100 via-yellow-200 to-orange-100",
    "from-teal-100 via-emerald-200 to-green-100"
];

const getGradientForIndex = (index: number) => {
    return cardGradients[index % cardGradients.length];
};

const samplePriceHistory = [
    { timestamp: 1, price: 45 },
    { timestamp: 2, price: 52 },
    { timestamp: 3, price: 48 },
    { timestamp: 4, price: 65 },
    { timestamp: 5, price: 58 },
    { timestamp: 6, price: 73 },
    { timestamp: 7, price: 68 },
    { timestamp: 8, price: 77 },
    { timestamp: 9, price: 85 },
    { timestamp: 10, price: 78 },
    { timestamp: 11, price: 82 },
    { timestamp: 12, price: 88 },
];

const HomePage: React.FC = () => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();
    const globalState = useGlobal();
    const [direction, setDirection] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [points, setPoints] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            getMarkets();
        };
        fetchData();
    }, []);

    const getMarkets = async () => {
        try {
            if (markets.length > 0) return;
            setIsLoading(true);
            const response = await getActiveMarkets();
            setMarkets(response.items);
        } catch (err) {
            setError('Failed to load markets. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDragEnd = async (event: any, info: PanInfo) => {
        const swipe = swipePower(info.offset.x, info.velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            await handleVote(false);
        } else if (swipe > swipeConfidenceThreshold) {
            await handleVote(true);
        } else {
            controls.start({ x: 0, rotate: 0 });
        }
    };

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleVote = async (isYes: boolean) => {
        const newDirection = isYes ? 1 : -1;
        setDirection(newDirection);

        await controls.start({
            x: isYes ? window.innerWidth : -window.innerWidth,
            rotate: isYes ? 30 : -30,
            transition: { duration: 0.3 }
        });

        console.log(`Voted ${isYes ? 'yes' : 'no'} on market ${markets[currentIndex].id} with ${points} points`);

        await new Promise(resolve => setTimeout(resolve, 100));
        setCurrentIndex(prev => prev + 1);
        controls.set({ x: 0, rotate: 0 });
    };

    if (error) {
        return (
            <div className="w-full max-w-[368px] text-center text-red-500">
                {error}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full max-w-[368px] text-center text-gray-500 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading Markets...
            </div>
        );
    }

    if (!markets.length) {
        return (
            <div className="w-full max-w-[368px] text-center text-gray-500">
                Loading Markets...
            </div>
        );
    }

    if (currentIndex >= markets.length) {
        return (
            <div className="w-full max-w-[368px] text-center text-gray-500">
                No more markets to vote on!
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#FBF7EF] pb-28 pt-8">
            <div className="w-full max-w-[368px] px-4 space-y-4">
                {/* Header Section */}
                <div className="relative space-y-2 text-center pb-2">

                    

                    <div className="relative transform">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-32 h-32 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-l from-fuchsia-500/20 via-violet-500/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse delay-100" />
                        </div>

                        <h1 className="relative text-4xl font-black tracking-tight drop-shadow-sm">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 animate-gradient-x">
                                Yopi
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
                                Nopi
                            </span>
                        </h1>
                    </div>
                    <div className="relative">
                        <p className="text-gray-600 text-xs font-medium mt-0.5 tracking-wider">
                            Swipe right for Yes, left for No
                        </p>
                    </div>
                </div>

                {/* Market Card */}
                <div className="relative h-[420px] w-full">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={handleDragEnd}
                            variants={swipeVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute w-full cursor-grab active:cursor-grabbing"
                            whileDrag={{ scale: 1.05 }}
                        >
                            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-[420px]">
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                                {/* Random gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientForIndex(currentIndex)}`} />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-6">
                                    {/* Top Badges */}
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            {/* Swipers Badge */}
                                            <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-sm font-medium text-white">
                                                        {markets[currentIndex].total_votes || '0'} players
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Resolution Time Badge */}
                                            <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                    <span className="text-sm font-medium text-white">
                                                        Ends in {formatTimeRemaining(Number(markets[currentIndex].end_time))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {markets[currentIndex].question_text}
                                            </h2>

                                            {/* Price History Chart */}
                                            <div className="h-24 -mx-6">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart
                                                        data={samplePriceHistory}
                                                        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                                                    >
                                                        <defs>
                                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area
                                                            type="monotone"
                                                            dataKey="price"
                                                            stroke="#8B5CF6"
                                                            strokeWidth={2}
                                                            fill="url(#colorPrice)"
                                                            dot={false}
                                                            isAnimationActive={true}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                {markets[currentIndex].extra_info?.token && (
                                                    <span className="px-2.5 py-1 bg-gray-800 text-white rounded-full text-xs font-medium">
                                                        {markets[currentIndex].extra_info.token}
                                                    </span>
                                                )}
                                                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Yes: {markets[currentIndex].yes_odds || '0%'}
                                                </span>
                                                <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                    No: {markets[currentIndex].no_odds || '0%'}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">
                                                {markets[currentIndex].description}
                                            </p>
                                        </div>

                                        {/* Vote indicators and Points Selector */}
                                        <div className="flex flex-col gap-4 mt-4">
                                            {/* Points Selector */}
                                            <div className="flex items-center justify-between gap-4"
                                                onPointerDown={(e) => e.stopPropagation()}
                                                onPointerMove={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPoints(prev => Math.max(1, prev - 1));
                                                    }}
                                                    className="p-1 rounded-full hover:bg-black/10 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4 text-gray-600" />
                                                </button>

                                                <div className="flex-1 relative">
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        value={points}
                                                        onChange={(e) => setPoints(Number(e.target.value))}
                                                        className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer 
                                                            [&::-webkit-slider-thumb]:appearance-none
                                                            [&::-webkit-slider-thumb]:w-8
                                                            [&::-webkit-slider-thumb]:h-8
                                                            [&::-webkit-slider-thumb]:rounded-full
                                                            [&::-webkit-slider-thumb]:bg-gray-800
                                                            [&::-webkit-slider-thumb]:cursor-pointer
                                                            [&::-webkit-slider-thumb]:shadow-lg
                                                            [&::-webkit-slider-thumb]:border-2
                                                            [&::-webkit-slider-thumb]:border-white"
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                        onPointerMove={(e) => e.stopPropagation()}
                                                    />
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPoints(prev => Math.min(100, prev + 1));
                                                    }}
                                                    className="p-1 rounded-full hover:bg-black/10 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>

                                            {/* Points Display and Vote Buttons in single line */}
                                            <div className="flex justify-between items-center">
                                                {/* Commented out No button
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleVote(false);
                                                    }}
                                                    className="flex items-center gap-2 text-red-500 hover:scale-105 transition-transform"
                                                >
                                                    <X className="w-6 h-6" />
                                                    <span>No</span>
                                                </button>
                                                */}

                                                {/* Points Display */}
                                                <span className="text-sm text-gray-600">
                                                    You're spending <span className="font-bold">{points}</span> points
                                                </span>

                                                {/* Commented out Yes button
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleVote(true);
                                                    }}
                                                    className="flex items-center gap-2 text-green-500 hover:scale-105 transition-transform"
                                                >
                                                    <span>Yes</span>
                                                    <Check className="w-6 h-6" />
                                                </button>
                                                */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default HomePage