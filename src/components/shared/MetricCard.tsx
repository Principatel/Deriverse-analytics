'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MetricCardProps {
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
    iconBorderColor?: string;
    title: string;
    subtitle: string;
    children: ReactNode;
    className?: string;
}

export function MetricCard({
    icon: Icon,
    iconColor = 'text-primary',
    iconBgColor = 'bg-primary/5',
    iconBorderColor = 'border-primary/10',
    title,
    subtitle,
    children,
    className
}: MetricCardProps) {
    return (
        <div className={cn(
            "pro-card p-6 rounded-xl border-white/[0.05] bg-[#0a0b0c]/50",
            className
        )}>
            <div className="flex items-center gap-3 mb-8">
                <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center border",
                    iconBgColor,
                    iconBorderColor
                )}>
                    <Icon className={cn("h-4 w-4", iconColor)} />
                </div>
                <div>
                    <h3 className="text-sm font-display font-semibold text-white tracking-tight">
                        {title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {subtitle}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}

interface MetricItemCardProps {
    label: string;
    innerLabel: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
    border?: string;
    className?: string;
}

export function MetricItemCard({
    label,
    innerLabel,
    value,
    icon: Icon,
    color = 'text-primary',
    border = 'border-primary/20',
    className
}: MetricItemCardProps) {
    return (
        <div className={cn(
            "pro-card p-5 rounded-xl border-white/[0.04] relative group overflow-hidden",
            "hover:border-white/10 transition-all duration-300",
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className={cn(
                    "h-7 w-7 rounded-lg bg-black/40 border flex items-center justify-center transition-colors",
                    border
                )}>
                    <Icon className={cn("h-3.5 w-3.5", color)} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {innerLabel}
                </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                {label}
            </p>
            <p className={cn("text-xl font-display font-medium tracking-tight", color)}>
                <span className="font-mono">{value}</span>
            </p>
        </div>
    );
}

interface CompactMetricRowProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
    className?: string;
}

export function CompactMetricRow({
    label,
    value,
    icon: Icon,
    color = 'text-slate-400',
    className
}: CompactMetricRowProps) {
    return (
        <div className={cn(
            "pro-card px-5 py-3 rounded-lg border-white/[0.03] flex items-center justify-between group bg-[#0a0b0c]/30",
            className
        )}>
            <div className="flex items-center gap-3">
                <Icon className={cn("h-3 w-3", color)} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    {label}
                </span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-primary transition-colors">
                {value}
            </span>
        </div>
    );
}
