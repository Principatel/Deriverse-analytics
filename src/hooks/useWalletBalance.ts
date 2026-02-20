'use client';

import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { type Provider } from '@reown/appkit-adapter-solana';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { getSolanaRpcUrl } from '@/lib/utils/rpc';

export function useWalletBalance() {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>('solana');
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        if (!isConnected || !address) {
            setBalance(null);
            return;
        }

        // Use Helius RPC if available and valid, otherwise fallback to public
        const rpcUrl = getSolanaRpcUrl();
        const connection = new Connection(rpcUrl, { commitment: 'confirmed', wsEndpoint: '' });
        const publicKey = new PublicKey(address);

        const fetchBalance = () => {
            connection.getBalance(publicKey).then((lamports) => {
                setBalance(lamports / LAMPORTS_PER_SOL);
            }).catch(err => console.error("Balance fetch failed:", err));
        };

        // Initial fetch
        fetchBalance();

        // Fallback polling (every 30s) instead of unstable WebSockets
        const intervalId = setInterval(fetchBalance, 30000);

        return () => {
            clearInterval(intervalId);
        };
    }, [address, isConnected]);

    return { balance, isConnected };
}
