'use client';

import { 
    BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, 
    CartesianGrid, Tooltip
} from 'recharts';
import { cn } from '@/lib/utils';
import { Timer, Sun, Moon, Coffee } from 'lucide-react';
import { MetricCard } from '@/components/shared/MetricCard';

interface TimeAnalysisProps {
    data: { hour: string; pnl: number }[];
    isLoading?: boolean;
}

export function TimeOfDayAnalysis({ data, isLoading }: TimeAnalysisProps) {
    if (isLoading) {
        return <div className="h-64 w-full animate-pulse rounded-xl bg-white/[0.02]" />;
    }

    return (
        <MetricCard
            icon={Timer}
            iconColor="text-emerald-500"
            iconBgColor="bg-emerald-500/5"
            iconBorderColor="border-emerald-500/20"
            title="Window Efficiency"
            subtitle="Session Profitability Scan"
            className="p-8"
        >
            <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Morning', icon: Coffee, active: true },
                        { label: 'London', icon: Sun, active: false },
                        { label: 'NY/Late', icon: Moon, active: false },
                    ].map((session) => (
                        <div key={session.label} className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all",
                            session.active 
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                                : "bg-white/[0.03] border-white/5 text-slate-500"
                        )}>
                            <session.icon className="h-3 w-3" />
                            {session.label}
                        </div>
                    ))}
                </div>
            </div>


            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff" opacity={0.02} />
                        <XAxis 
                            dataKey="hour" 
                            stroke="#475569" 
                            fontSize={9} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                        />
                        <YAxis 
                            stroke="#475569" 
                            fontSize={9} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(val) => `$${val}`}
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const val = payload[0].value as number;
                                    return (
                                        <div className="rounded-lg border border-white/10 bg-[#0d0e10]/95 p-3 shadow-2xl backdrop-blur-md">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label} Window</p>
                                            <p className={cn(
                                                "text-sm font-mono font-bold",
                                                val >= 0 ? "text-emerald-400" : "text-red-400"
                                            )}>
                                                {val >= 0 ? '+' : ''}{val} PnL
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar 
                            dataKey="pnl" 
                            radius={[4, 4, 0, 0]}
                            animationDuration={2000}
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} 
                                    fillOpacity={0.4}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Peak Alpha</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Risk Variance</span>
                </div>
            </div>
        </MetricCard>
    );
}
