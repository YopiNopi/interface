'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TelegramLogin() {
    const { login, ready, authenticated, user } = usePrivy();

    const loginOptions: any = {
        loginMethod: 'telegram',
        createWallet: true,
    };

    // Get the embedded wallet address
    const walletAddress = user?.wallet?.address;

    if (!ready) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (authenticated && user) {
        return (

            <div>
                {/* User Profile Header with Gradient Orb */}
                <div className="relative" >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-32 h-32 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-pink-500/30 rounded-full blur-3xl" />
                    </div>
                    <div className="relative flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                            <AvatarImage src={user.telegram?.photoUrl ? user.telegram?.photoUrl : ''} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-lg text-white">
                                {user.telegram?.firstName} {user.telegram?.lastName}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                                {user.telegram?.firstName} {user.telegram?.lastName}
                            </h1>
                            <p className="text-sm text-gray-500">
                                Active Trader
                            </p>
                        </div>
                    </div>
                </div >
            </div>
        );
    }

    return (
        <button
            onClick={() => login(loginOptions)}
            className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-[#229ED9] text-white rounded-lg hover:bg-[#1e8bc3] transition-colors"
        >
            {/* <TelegramLogo className="w-5 h-5" /> */}
            <span>Continue with Telegram</span>
        </button>
    );
}