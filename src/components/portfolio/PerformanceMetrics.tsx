'use client';

import { formatCurrency, formatPercentage } from '@/lib/utils/format';
import { TrendingUp, TrendingDown, Wallet, Briefcase, BarChart3, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWalletActivity } from '@/hooks/useWalletActivity';
import { useAppKitAccount } from '@reown/appkit/react';
import { useDashboardStore } from '@/store/useDashboardStore';

export function PerformanceMetrics() {
    const { isConnected, address } = useAppKitAccount();
    const { mode, exploreAddress, timeframe } = useDashboardStore();
    
    // Connect to the same logic as the main page
    const effectiveAddress = mode === 'OWN' ? address : (mode === 'EXPLORE' ? exploreAddress : undefined);
    const isGeneralMode = mode === 'GENERAL';
    const activity = useWalletActivity(effectiveAddress, isGeneralMode, timeframe);

    const metrics = [
        { 
            label: isGeneralMode ? 'Protocol TVL' : 'Total Volume', 
            value: isGeneralMode ? 68453000 : activity.totalVolume, 
            type: 'currency', 
            icon: Wallet 
        },
        { 
            label: isGeneralMode ? 'Daily Volume' : 'Calculated P&L', 
            value: isGeneralMode ? 12450000 : activity.dailyPnl * 2.5, 
            type: 'currency', 
            positive: isGeneralMode ? true : activity.dailyPnl > 0, 
            icon: BarChart3 
        },
        { 
            label: isGeneralMode ? 'Ecosystem Win Rate' : 'Win Probability', 
            value: isGeneralMode ? 64.2 : activity.winRate, 
            type: 'percentage', 
            positive: true, 
            icon: TrendingUp 
        },
        { 
            label: isGeneralMode ? 'Market Drawdown' : 'Risk Volatility', 
            value: isGeneralMode ? 8.4 : activity.maxDrawdown, 
            type: 'percentage', 
            positive: false, 
            icon: Briefcase 
        },
        { 
            label: 'Intelligence Rating', 
            value: isGeneralMode ? 'AAA' : (activity.maxDrawdown > 5 ? 'Elevated' : 'Optimal'), 
            type: 'text', 
            icon: TrendingDown 
        },
        { 
            label: 'Terminal Scope', 
            value: mode, 
            type: 'text', 
            icon: PieChart 
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
                <div key={metric.label} className="pro-card pro-card-hover rounded-xl p-6 border-white/[0.04] relative overflow-hidden group">
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <metric.icon className="h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">
                                {metric.label}
                            </p>
                        </div>
                        <div className={cn(
                            "text-2xl font-display font-medium tracking-tight transition-all duration-300",
                            metric.positive === true ? 'text-emerald-400 group-hover:text-emerald-300' :
                            metric.positive === false ? 'text-red-400 group-hover:text-red-300' : 'text-white'
                        )}>
                            <span className="font-mono">
                                {metric.type === 'currency' && formatCurrency(metric.value as number)}
                                {metric.type === 'percentage' && formatPercentage(metric.value as number)}
                                {metric.type === 'text' && metric.value}
                            </span>
                        </div>
                     </div>
                     
                     {/* Subtle depth element */}
                     <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <metric.icon className="h-12 w-12 text-white" />
                     </div>
                </div>
            ))}
        </div>
    );
}
