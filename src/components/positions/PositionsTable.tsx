'use client';

import { usePositionStore } from '@/store/usePositionStore';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ExternalLink, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PositionsTable() {
    const { positions, closePosition, isLoading } = usePositionStore();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="h-20 w-full animate-pulse rounded-2xl bg-white/5" />
                ))}
            </div>
        );
    }

    if (positions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 glass-card rounded-3xl border-dashed border-white/5">
                <ShieldAlert className="h-12 w-12 opacity-10 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest italic">No active risk detected</p>
                <p className="text-xs opacity-60 mt-2">Open a position to monitor exposure in real-time.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5">
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Asset & Mode</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Position Size</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Entry/Mark</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Liquidation</th>
                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Unrealized P&L</th>
                        <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Control</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {positions.map((position) => {
                        const isProfit = position.unrealizedPnl >= 0;
                        return (
                            <tr key={position.assetSymbol} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-2 w-2 rounded-full animate-pulse",
                                            position.direction === 'Long' ? "bg-green-500" : "bg-red-500"
                                        )} />
                                        <div>
                                            <div className="text-sm font-black text-white uppercase italic tracking-tighter">
                                                {position.assetSymbol}
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-500">
                                                {position.direction} <span className="text-primary">{position.leverage}x</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="text-sm font-mono font-bold text-slate-200">
                                        {formatNumber(position.size)}
                                    </div>
                                    <div className="text-[10px] font-semibold text-slate-500">
                                        {formatCurrency(position.marginUsed)} Margin
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="text-sm font-mono font-bold text-slate-200">
                                        {formatCurrency(position.entryPrice)}
                                    </div>
                                    <div className="text-[10px] font-semibold text-primary/60">
                                        {formatCurrency(position.markPrice)} (Mark)
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="text-sm font-mono font-bold text-amber-500">
                                        {formatCurrency(position.liquidationPrice)}
                                    </div>
                                    <div className="h-1 w-20 bg-white/10 rounded-full mt-2 overflow-hidden">
                                         <div className="h-full bg-amber-500 w-[40%] shadow-[0_0_10px_orange]" />
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className={cn(
                                        "text-sm font-mono font-bold",
                                        isProfit ? 'text-green-400' : 'text-red-400'
                                    )}>
                                        {isProfit ? '+' : ''}{formatCurrency(position.unrealizedPnl)}
                                    </div>
                                    <div className={cn(
                                        "text-[10px] font-bold",
                                        isProfit ? 'text-green-500/60' : 'text-red-500/60'
                                    )}>
                                        {formatPercentage(position.unrealizedPnlPercentage)}
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                                            <ExternalLink className="h-4 w-4 text-slate-400" />
                                        </button>
                                        <button 
                                            onClick={() => closePosition(position.assetSymbol)}
                                            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase italic tracking-tighter hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                        >
                                            Market Exit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
