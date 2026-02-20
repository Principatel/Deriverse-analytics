'use client';

import { Search, Calendar, Filter, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useDashboardStore, Timeframe } from '@/store/useDashboardStore';

interface DashboardFiltersProps {
    onFilterChange?: (filters: any) => void;
}

const assets = ['ALL ASSETS', 'BTC-PERP', 'SOL-PERP', 'ETH-PERP', 'BONK-PERP', 'JUP-PERP'];
const timeframes: { label: string; value: Timeframe }[] = [
    { label: '7D', value: '7D' },
    { label: '30D', value: '30D' },
    { label: '90D', value: '90D' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' },
];

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
    const { timeframe, setTimeframe, assetType, setAssetType } = useDashboardStore();
    const [isAssetOpen, setIsAssetOpen] = useState(false);

    return (
        <div className="flex flex-wrap items-center gap-4 py-6 border-y border-white/5">
            {/* Asset Selector */}
            <div className="relative">
                <button 
                    onClick={() => setIsAssetOpen(!isAssetOpen)}
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all text-xs font-black uppercase tracking-widest text-slate-200"
                >
                    <Filter className="h-4 w-4 text-primary" />
                    {assetType}
                    <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", isAssetOpen && "rotate-180")} />
                </button>

                {isAssetOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-xl z-50 overflow-hidden shadow-2xl p-2 scale-in">
                        {assets.map((a) => (
                            <button
                                key={a}
                                onClick={() => {
                                    setAssetType(a);
                                    setIsAssetOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors",
                                    assetType === a ? "bg-primary/10 text-primary" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {a}
                                {assetType === a && <Check className="h-3 w-3" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Timeframes */}
            <div className="flex p-1 rounded-[1.2rem] bg-black/40 border border-white/5">
                {timeframes.map((tf) => (
                    <button
                        key={tf.value}
                        onClick={() => setTimeframe(tf.value)}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            timeframe === tf.value 
                                ? "bg-white/10 text-white shadow-inner" 
                                : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        {tf.label}
                    </button>
                ))}
            </div>

            <div className="h-10 w-px bg-white/5 mx-2 hidden md:block" />

            {/* Custom Range Picker Placeholder */}
            <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all text-xs font-black uppercase tracking-widest text-slate-400">
                <Calendar className="h-4 w-4" />
                Custom Range
            </button>

            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                    type="text"
                    placeholder="Search trade annotations..."
                    className="w-full bg-black/40 border border-white/5 focus:border-primary/20 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium text-white outline-none transition-all"
                />
            </div>
        </div>
    );
}
