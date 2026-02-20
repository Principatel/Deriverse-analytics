'use client';

import { 
    Clock, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Trophy, 
    Skull, 
    TrendingUp, 
    TrendingDown,
    Activity
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';
import { MetricItemCard, CompactMetricRow } from '@/components/shared/MetricCard';

interface AdvancedMetricsProps {
    data: { 
        avgDuration: string; 
        longRatio: number;
        largestWin: number;
        largestLoss: number;
        avgWin: number; 
        avgLoss: number;
        tradeCount: number;
        winRate: number;
    };
    isLoading?: boolean;
}

export function AdvancedMetrics({ data, isLoading }: AdvancedMetricsProps) {
    const metrics = [
        { 
            label: 'Avg Duration', 
            innerLabel: 'Holding window',
            value: data.avgDuration, 
            icon: Clock, 
            color: 'text-primary',
            border: 'border-primary/20'
        },
        { 
            label: 'Long/Short', 
            innerLabel: 'Directional bias',
            value: `${data.longRatio}% Long`, 
            icon: data.longRatio > 50 ? ArrowUpRight : ArrowDownLeft, 
            color: data.longRatio > 50 ? 'text-emerald-500' : 'text-red-500',
            border: data.longRatio > 50 ? 'border-emerald-500/20' : 'border-red-500/20'
        },
        { 
            label: 'Largest Win', 
            innerLabel: 'Peak Execution',
            value: formatCurrency(data.largestWin), 
            icon: Trophy, 
            color: 'text-emerald-500',
            border: 'border-emerald-500/20'
        },
        { 
            label: 'Largest Loss', 
            innerLabel: 'Risk Realization',
            value: formatCurrency(data.largestLoss), 
            icon: Skull, 
            color: 'text-red-500',
            border: 'border-red-500/20'
        },
    ];

    const secondaryMetrics = [
        { label: 'Avg Win', value: formatCurrency(data.avgWin), icon: TrendingUp, color: 'text-emerald-500' },
        { label: 'Avg Loss', value: formatCurrency(data.avgLoss), icon: TrendingDown, color: 'text-red-500' },
        { label: 'Win Rate', value: `${data.winRate.toFixed(1)}%`, icon: Trophy, color: 'text-primary' },
        { label: 'Density', value: `${formatNumber(data.tradeCount, 0)} trades`, icon: Activity, color: 'text-slate-400' },
    ];

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 w-full animate-pulse rounded-xl bg-white/[0.02]" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m) => (
                    <MetricItemCard
                        key={m.label}
                        label={m.label}
                        innerLabel={m.innerLabel}
                        value={m.value}
                        icon={m.icon}
                        color={m.color}
                        border={m.border}
                    />
                ))}
            </div>

            <div className="grid gap-3 md:grid-cols-4">
                {secondaryMetrics.map((m) => (
                    <CompactMetricRow
                        key={m.label}
                        label={m.label}
                        value={m.value}
                        icon={m.icon}
                        color={m.color}
                    />
                ))}
            </div>
        </div>
    );
}
