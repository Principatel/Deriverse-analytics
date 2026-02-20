'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';
import { useDashboardStore } from '@/store/useDashboardStore';

const generalData = [
    { name: 'SOL Pool', value: 45000000, color: '#00f5ff' },
    { name: 'USDC Vault', value: 15453000, color: '#9333ea' },
    { name: 'Governance', value: 5000000, color: '#f59e0b' },
];

const personalData = [
    { name: 'Active Margin', value: 5400, color: '#00f5ff' },
    { name: 'Available', value: 3200, color: '#9333ea' },
    { name: 'Staked', value: 1100, color: '#f59e0b' },
];

export function AllocationChart() {
    const { mode } = useDashboardStore();
    const isGeneral = mode === 'GENERAL';
    const chartData = isGeneral ? generalData : personalData;

    return (
        <Card className="glass-card border-none bg-transparent shadow-none h-full">
            <CardContent className="p-0">
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={12}
                                dataKey="value"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth={2}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color} 
                                        className="hover:opacity-80 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const entry = payload[0].payload;
                                        return (
                                            <div className="rounded-xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                                        {entry.name}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-mono font-bold text-white">
                                                    {formatCurrency(payload[0].value as number)}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend 
                                verticalAlign="bottom" 
                                height={60} 
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
