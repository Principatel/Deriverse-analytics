import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        label: string;
    };
    className?: string;
    isLoading?: boolean;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className,
    isLoading = false,
}: StatsCardProps) {
    return (
        <Card className={cn(
            'pro-card pro-card-hover group relative overflow-hidden',
            className
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors">
                    {title}
                </CardTitle>
                <div className="h-7 w-7 rounded-md bg-white/[0.03] flex items-center justify-center border border-white/[0.05] group-hover:border-primary/30 transition-all duration-300 shadow-sm">
                    <Icon className={cn("h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors", isLoading && "animate-pulse")} />
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        <div className="h-8 w-24 bg-white/[0.03] rounded-md animate-pulse" />
                        <div className="h-3 w-32 bg-white/[0.02] rounded-md animate-pulse" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-2xl font-mono font-bold tracking-tight text-white group-hover:text-primary-foreground transition-all duration-300">
                            {value}
                        </div>
                        {(description || trend) && (
                            <div className="flex items-center gap-2">
                                {trend && (
                                    <span
                                        className={cn(
                                            'px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border transition-all duration-300',
                                            trend.value > 0 
                                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                        )}
                                    >
                                        {trend.value > 0 ? '+' : ''}{trend.value}%
                                    </span>
                                )}
                                <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                                    {description || trend?.label}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Card>
    );
}
