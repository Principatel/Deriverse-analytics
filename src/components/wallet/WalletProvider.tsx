'use client';

import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';
import { FC, ReactNode } from 'react';

// 1. Get projectId from https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'your_project_id_here';

if (!projectId) {
    throw new Error('Project ID is not defined');
}

// 2. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: []
});

// 3. Configure the metadata
const metadata = {
    name: 'Deriverse Dashboard',
    description: 'Trading Analytics for Deriverse',
    url: 'https://deriverse.io', // Placeholder URL
    icons: ['https://assets.reown.com/reown-profile-pic.png']
};

// 4. Create the AppKit instance
createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: [solana, solanaTestnet, solanaDevnet],
    metadata,
    projectId,
    features: {
        analytics: true
    }
});

export const AppWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};
