'use client';

import { DollarSign } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { formatCurrency } from '@/lib/utils/format';

export function LiveWalletBalanceCard() {
    const { balance, isConnected } = useWalletBalance();

    return (
        <StatsCard
            title="Wallet Balance"
            value={isConnected ? (balance !== null ? `${balance.toFixed(4)} SOL` : 'Fetching...') : 'Not Connected'}
            icon={DollarSign}
            description={isConnected ? "Live from Solana" : "Connect wallet to see balance"}
            className={isConnected ? "border-green-500/20" : ""}
        />
    );
}
