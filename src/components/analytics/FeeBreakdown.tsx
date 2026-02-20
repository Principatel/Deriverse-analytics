'use client';

import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils';
import { Receipt, MousePointer2 } from 'lucide-react';
import { MetricCard } from '@/components/shared/MetricCard';

interface FeeBreakdownProps {
    composition: { type: string; amount: number; percentage: number }[];
    orderPerformance: { type: string; winRate: number; count: number }[];
    totalFees: number;
    isLoading?: boolean;
}

const COLORS = ['#14b8a6', '#3b82f6', '#f59e0b', '#ef4444'];

export function FeeBreakdown({ composition, orderPerformance, totalFees, isLoading }: FeeBreakdownProps) {
    if (isLoading) {
        return <div className="h-64 w-full animate-pulse rounded-xl bg-white/[0.02]" />;
    }

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {/* Fee Composition */}
            <MetricCard
                icon={Receipt}
                iconColor="text-primary"
                iconBgColor="bg-primary/5"
                iconBorderColor="border-primary/10"
                title="Fee Allocation"
                subtitle={`Cumulative: ${formatCurrency(totalFees)}`}
            >
                <div className="h-[180px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={composition}
                                cx="35%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={65}
                                paddingAngle={4}
                                dataKey="amount"
                                stroke="none"
                            >
                                {composition.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border border-white/10 bg-[#0d0e10]/95 p-3 shadow-2xl backdrop-blur-md">
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">{payload[0].name}</p>
                                                <p className="text-xs font-mono font-bold text-white">{formatCurrency(payload[0].value as number)}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right"
                                iconSize={8}
                                iconType="circle"
                                formatter={(value, entry: any) => (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-2">
                                        {value} <span className="font-mono text-slate-600">({entry.payload.percentage}%)</span>
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </MetricCard>

            {/* Order Type Efficiency */}
            <MetricCard
                icon={MousePointer2}
                iconColor="text-blue-400"
                iconBgColor="bg-blue-500/5"
                iconBorderColor="border-blue-500/20"
                title="Strategy Efficiency"
                subtitle="Directional Success Scan"
            >

                <div className="space-y-6">
                    {orderPerformance.map((op, i) => (
                        <div key={op.type} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{op.type} Execution</span>
                                <span className="text-xs font-mono font-bold text-primary">{op.winRate}% Success</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                <div 
                                    className={cn(
                                        "h-full rounded-full transition-all duration-1000",
                                        i === 0 ? "bg-primary" : "bg-blue-500"
                                    )}
                                    style={{ width: `${op.winRate}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                <span>Share Index</span>
                                <span>{op.count} Trades Realized</span>
                            </div>
                        </div>
                    ))}
                </div>
            </MetricCard>
        </div>
    );
}
