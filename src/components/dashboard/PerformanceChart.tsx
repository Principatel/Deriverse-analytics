'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '@/lib/utils/format';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Layers, Calendar, Clock } from 'lucide-react';

interface PerformancePoint {
    date: string;
    value: number;
    drawdown: number;
}

interface PerformanceChartProps {
    dailyData?: PerformancePoint[];
    hourlyData?: PerformancePoint[];
    isLoading?: boolean;
}

export function PerformanceChart({ dailyData = [], hourlyData = [], isLoading }: PerformanceChartProps) {
    const [view, setView] = useState<'equity' | 'drawdown' | 'unified'>('unified');
    const [timeframe, setTimeframe] = useState<'daily' | 'hourly'>('daily');

    const activeData = timeframe === 'daily' ? dailyData : hourlyData;

    if (isLoading) {
        return <div className="h-[400px] w-full animate-pulse rounded-xl bg-white/[0.02]" />;
    }

    return (
        <Card className="col-span-4 pro-card overflow-hidden group">
            <CardHeader className="border-b border-white/[0.04] flex flex-col xl:flex-row xl:items-center justify-between py-5 px-6 gap-6 bg-[#0a0b0c]/50">
                <div className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base font-display font-semibold tracking-tight text-white">
                            Historical <span className="text-primary italic">PnL Curvature</span>
                        </CardTitle>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mt-0.5">Time-Weighted Equity tracking</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Resolution Toggle */}
                    <div className="flex p-0.5 rounded-lg bg-[#0d0e10] border border-white/[0.05]">
                        <button
                            onClick={() => setTimeframe('daily')}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                                timeframe === 'daily' ? "bg-white/[0.05] text-white" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Calendar className="h-3 w-3" />
                            Daily
                        </button>
                        <button
                            onClick={() => setTimeframe('hourly')}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                                timeframe === 'hourly' ? "bg-white/[0.05] text-white" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Clock className="h-3 w-3" />
                            Hourly
                        </button>
                    </div>

                    <div className="h-6 w-px bg-white/5 hidden xl:block" />

                    {/* View Mode Toggle */}
                    <div className="flex p-0.5 rounded-lg bg-[#0d0e10] border border-white/[0.05]">
                        {[
                            { id: 'equity', label: 'Equity', icon: TrendingUp },
                            { id: 'drawdown', label: 'Drawdown', icon: TrendingDown },
                            { id: 'unified', label: 'Unified', icon: Layers },
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setView(btn.id as any)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                                    view === btn.id 
                                        ? "bg-primary/10 text-primary" 
                                        : "text-slate-500 hover:text-slate-300"
                                )}
                            >
                                <btn.icon className="h-3 w-3" />
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activeData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.08} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="4 4" 
                                vertical={false} 
                                stroke="#ffffff" 
                                opacity={0.03} 
                            />
                            <XAxis
                                dataKey="date"
                                stroke="#475569"
                                fontSize={9}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                interval={timeframe === 'hourly' ? 2 : 0}
                            />
                            <YAxis
                                yAxisId="equity"
                                hide={view === 'drawdown'}
                                tickFormatter={(val) => `$${val / 1000}k`}
                                stroke="#475569"
                                fontSize={9}
                                tickLine={false}
                                axisLine={false}
                                domain={['auto', 'auto']}
                                dx={-10}
                            />
                            <YAxis
                                yAxisId="drawdown"
                                orientation="right"
                                hide={view === 'equity'}
                                tickFormatter={(val) => `${val}%`}
                                stroke="#ef4444"
                                opacity={0.6}
                                fontSize={9}
                                tickLine={false}
                                axisLine={false}
                                reversed
                                domain={[0, 'auto']}
                                dx={10}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border border-white/10 bg-[#0d0e10]/95 p-4 shadow-2xl backdrop-blur-md">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 pb-2 border-b border-white/5">
                                                    {label} {timeframe === 'hourly' ? 'Session' : ''}
                                                </p>
                                                <div className="space-y-2.5">
                                                    {payload.map((p, i) => (
                                                        <div key={i} className="flex items-center justify-between gap-6">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                                                                <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">{p.name}</span>
                                                            </div>
                                                            <span className={cn(
                                                                "text-xs font-mono font-bold",
                                                                p.name === 'Equity' ? "text-emerald-400" : "text-red-400"
                                                            )}>
                                                                {p.name === 'Equity' ? formatCurrency(p.value as number) : `${(p.value as number).toFixed(2)}%`}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {(view === 'equity' || view === 'unified') && (
                                <Area
                                    yAxisId="equity"
                                    type="monotone"
                                    dataKey="value"
                                    name="Equity"
                                    stroke="#14b8a6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorEquity)"
                                    animationDuration={1500}
                                />
                            )}
                            {(view === 'drawdown' || view === 'unified') && (
                                <Area
                                    yAxisId="drawdown"
                                    type="step"
                                    dataKey="drawdown"
                                    name="Drawdown"
                                    stroke="#ef4444"
                                    strokeWidth={1.5}
                                    strokeDasharray="4 4"
                                    fillOpacity={1}
                                    fill="url(#colorDrawdown)"
                                    animationDuration={2000}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
