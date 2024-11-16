"use client"

import React, { useEffect, useState } from 'react'
import useGlobal from '@/hooks/useGlobal';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { getActiveMarkets } from '@/utils/api';
import { Check, X, Loader2 } from 'lucide-react';
import { Market } from '@/types/market';
import { formatTimeRemaining } from '@/utils/dateFormat';

const swipeConfidenceThreshold = 10000;
const swipeThreshold = 100;

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    rotate: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    rotate: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    rotate: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

const HomePage: React.FC = () => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();
    const globalState = useGlobal();
    const [direction, setDirection] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            setDirection(-1);
            await controls.start({ 
                x: -window.innerWidth, 
                rotate: -30,
                transition: { duration: 0.5 }
            });
            console.log(`Voted no on market ${markets[currentIndex].id}`);
            setCurrentIndex(prev => prev + 1);
            controls.set({ x: 0, rotate: 0 });
        } else if (swipe > swipeConfidenceThreshold) {
            setDirection(1);
            await controls.start({ 
                x: window.innerWidth, 
                rotate: 30,
                transition: { duration: 0.5 }
            });
            console.log(`Voted yes on market ${markets[currentIndex].id}`);
            setCurrentIndex(prev => prev + 1);
            controls.set({ x: 0, rotate: 0 });
        } else {
            controls.start({ x: 0, rotate: 0 });
        }
    };

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
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
        <div className="flex flex-col items-center min-h-screen bg-[#FBF7EF] pb-28 pt-16">
            <div className="w-full max-w-[368px] px-4 space-y-8">
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
                            Swipe right for Yes, left for No
                        </p>
                        <div className="absolute left-1/2 -bottom-4 w-20 h-[2px] bg-gradient-to-r from-indigo-500/0 via-purple-500/50 to-indigo-500/0 transform -translate-x-1/2" />
                    </div>
                </div>

                {/* Market Card */}
                <div className="relative h-[460px] w-full">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        variants={swipeVariants}
                        initial="center"
                        className="absolute w-full cursor-grab active:cursor-grabbing"
                        style={{ x: 0 }}
                        whileDrag={{ scale: 1.05 }}
                    >
                        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-[460px]">
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                            
                            {/* Random gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-200 to-pink-100" />

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-6">
                                {/* Resolution Time Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-sm font-medium text-white">
                                                {formatTimeRemaining(markets[currentIndex].end_time)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {markets[currentIndex].question_text}
                                    </h2>
                                    {markets[currentIndex].extra_info?.token && (
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <span className="font-medium">Token:</span>
                                            <span>{markets[currentIndex].extra_info.token}</span>
                                        </div>
                                    )}
                                    <p className="text-gray-600">
                                        {markets[currentIndex].description || "No additional details provided."}
                                    </p>
                                </div>

                                {/* Vote indicators */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-2 text-red-500">
                                        <X className="w-6 h-6" />
                                        <span>No</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-500">
                                        <span>Yes</span>
                                        <Check className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HomePage