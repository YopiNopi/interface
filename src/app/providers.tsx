'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiConfig, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { mainnet, sepolia } from 'wagmi/chains'

const queryClient = new QueryClient();

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cm3kjd05g008xoab7flp8qaav';

// Configure wagmi
const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http('https://mainnet.example.com'),
        [sepolia.id]: http('https://sepolia.example.com'),
    },
});

export function Providers({ children }: PropsWithChildren) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <PrivyProvider
                    appId={appId}
                    config={{
                        loginMethods: ['telegram'],
                        appearance: {
                            theme: 'light',
                            accentColor: '#229ED9'
                        },
                        defaultChain: mainnet,
                        // Disable the modal
                        embeddedWallets: {
                            noPromptOnSignature: true,
                            createOnLogin: 'users-without-wallets'
                        },
                    }}

                >
                    {children}
                </PrivyProvider>
            </QueryClientProvider>
        </WagmiConfig>
    );
}