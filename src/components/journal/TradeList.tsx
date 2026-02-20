'use client';

import { useTradeStore } from '@/store/useTradeStore';
import { formatDate, formatCurrency, formatPercentage } from '@/lib/utils/format';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, Layers, StickyNote, Tag, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function TradeList() {
    const { trades, isLoading, updateTrade } = useTradeStore();
    const [editingNote, setEditingNote] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 w-full animate-pulse rounded-2xl bg-white/5" />
                ))}
            </div>
        );
    }

    if (trades.length === 0) {
        return (
            <Card className="glass-card border-dashed border-white/10">
                <CardContent className="flex h-40 flex-col items-center justify-center text-slate-500">
                    <Layers className="mb-2 h-8 w-8 opacity-20" />
                    <p className="text-sm">No trades recorded yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {trades.slice(0, 8).map((trade) => {
                const isProfit = trade.pnl >= 0;
                return (
                    <Card key={trade.id} className="glass-card glass-card-hover group border-white/5">
                        <CardContent className="p-0">
                            <div className="px-5 py-4">
                                <div className="flex items-center gap-4">
                                    {/* Direction Icon */}
                                    <div className={cn(
                                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300",
                                        trade.direction === 'Long' 
                                            ? "bg-green-500/10 border-green-500/20 text-green-400 group-hover:bg-green-500/20" 
                                            : "bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-500/20"
                                    )}>
                                        {trade.direction === 'Long' ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                                    </div>

                                    {/* Asset Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">{trade.assetSymbol}</h4>
                                            <span className="text-[10px] font-black text-slate-500 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5 uppercase tracking-widest">
                                                {trade.leverage}X
                                            </span>
                                            {trade.tags?.map(tag => (
                                                <span key={tag} className="text-[9px] font-bold text-primary/60 bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10 flex items-center gap-1 uppercase">
                                                    <Tag className="h-2 w-2" /> {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-[0.15em]">
                                            <span className="flex items-center gap-1.5 font-mono">
                                                 <Clock className="h-3 w-3" />
                                                 {formatDate(trade.openTime, 'MMM dd, HH:mm')}
                                            </span>
                                            <span className="text-slate-700">|</span>
                                            <span className="text-slate-500">Size: {trade.size}</span>
                                        </div>
                                    </div>

                                    {/* PnL Analysis */}
                                    <div className="text-right">
                                        <div className={cn(
                                            "text-xl font-mono font-black italic tracking-tighter",
                                            isProfit ? "text-green-400 group-hover:neon-text transition-all" : "text-red-400"
                                        )}>
                                            {isProfit ? '+' : ''}{formatCurrency(trade.pnl)}
                                        </div>
                                        <div className={cn(
                                            "text-[10px] font-black uppercase tracking-widest mt-1",
                                            isProfit ? "text-green-500/40" : "text-red-500/40"
                                        )}>
                                            {formatPercentage(trade.pnlPercentage)}
                                        </div>
                                    </div>

                                    <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Annotation Section */}
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-white/3 flex items-center justify-center shrink-0">
                                        <StickyNote className="h-3 w-3 text-slate-600" />
                                    </div>
                                    <div className="flex-1">
                                        {editingNote === trade.id ? (
                                            <div className="flex gap-2">
                                                <input 
                                                    autoFocus
                                                    defaultValue={trade.notes || ''}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            updateTrade(trade.id, { notes: e.currentTarget.value });
                                                            setEditingNote(null);
                                                        }
                                                        if (e.key === 'Escape') setEditingNote(null);
                                                    }}
                                                    onBlur={(e) => {
                                                        updateTrade(trade.id, { notes: e.currentTarget.value });
                                                        setEditingNote(null);
                                                    }}
                                                    className="w-full bg-black/40 border border-primary/20 rounded-lg p-2 text-xs text-white outline-none"
                                                />
                                            </div>
                                        ) : (
                                            <p 
                                                onClick={() => setEditingNote(trade.id)}
                                                className={cn(
                                                    "text-xs font-medium cursor-text italic",
                                                    trade.notes ? "text-slate-400" : "text-slate-600"
                                                )}
                                            >
                                                {trade.notes || 'Click to add trade annotation or thesis...'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
