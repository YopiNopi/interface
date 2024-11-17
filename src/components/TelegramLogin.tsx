'use client';

import { usePrivy } from '@privy-io/react-auth';

type LoginOptions = {
    loginMethod: string;
    createWallet?: boolean;
};
export function TelegramLogin() {
    const { login, ready, authenticated, user } = usePrivy();

    const loginOptions: LoginOptions = {
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
            <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                    {user.telegram?.photoUrl && (
                        <img
                            src={user.telegram.photoUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    )}
                    <div>
                        <h2 className="font-medium">
                            {user.telegram?.firstName} {user.telegram?.lastName}
                        </h2>
                        {user.telegram?.username && (
                            <p className="text-sm text-gray-500">@{user.telegram.username}</p>
                        )}
                    </div>
                </div>

                {/* Wallet Address */}
                <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
                    <div className="mt-1 flex items-center space-x-2">
                        <code className="text-sm bg-gray-100 p-2 rounded break-all">
                            {walletAddress}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(walletAddress || '')}
                            className="p-2 text-gray-500 hover:text-gray-700"
                            title="Copy address"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
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