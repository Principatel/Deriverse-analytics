'use client';

import { Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { usePriceTicker } from '@/hooks/usePriceTicker';
import { formatCurrency } from '@/lib/utils/format';

export function LiveSolPriceCard() {
    const price = usePriceTicker('SOL');

    return (
        <StatsCard
            title="Live SOL Price"
            value={price ? formatCurrency(price) : 'Loading...'}
            icon={Activity}
            description="Real-time from Binance"
            className="border-blue-500/20"
        />
    );
}
