'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatPercentage, formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';

export function RiskMetrics() {
    const metrics = [
        { label: 'Sharpe Ratio', value: 1.8, type: 'number' },
        { label: 'Max Drawdown', value: -12.5, type: 'percentage', negative: true },
        { label: 'Long/Short Ratio', value: '60/40', type: 'text' },
        { label: 'Avg Win/Loss', value: 2.1, type: 'number' },
        { label: 'Consecutive Wins', value: 4, type: 'number' },
        { label: 'Consecutive Losses', value: 2, type: 'number', negative: true },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
                <div key={metric.label} className="glass-card glass-card-hover rounded-3xl p-6 border-white/5 group relative overflow-hidden">
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-105 origin-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-primary transition-colors">
                            {metric.label}
                        </p>
                        <div className={cn(
                            "text-3xl font-black italic tracking-tighter uppercase font-mono transition-colors duration-300",
                            metric.negative ? "text-red-400 group-hover:text-red-300" : "text-white group-hover:text-primary group-hover:neon-text"
                        )}>
                            {metric.type === 'percentage' && formatPercentage(metric.value as number)}
                            {metric.type === 'currency' && formatCurrency(metric.value as number)}
                            {metric.type === 'number' && metric.value}
                            {metric.type === 'text' && metric.value}
                        </div>
                        {metric.value === '60/40' && (
                            <div className="h-1.5 w-full mt-4 bg-red-500/20 rounded-full overflow-hidden flex border border-white/5">
                                <div className="h-full bg-green-500 w-[60%] shadow-[0_0_10px_#22c55e]"></div>
                            </div>
                        )}
                        <div className={cn(
                            "absolute -bottom-6 -left-6 h-12 w-12 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity",
                            metric.negative ? "bg-red-500" : "bg-primary"
                        )} />
                    </div>
                    {/* Bottom Indicator */}
                    <div className={cn(
                         "absolute bottom-0 left-0 h-0.5 transition-all duration-500 w-0 group-hover:w-full",
                         metric.negative ? "bg-red-500 shadow-[0_0_10px_#ef4444]" : "bg-primary shadow-[0_0_10px_#00f5ff]"
                    )} />
                </div>
            ))}
        </div>
    );
}
