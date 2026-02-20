'use client';

import { 
    User, 
    Search, 
    Activity, 
    Globe,
    ChevronRight,
    Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';

const mainNavItems = [
    { id: 'GENERAL', label: 'Protocol Data', icon: Globe, description: 'Aggregate Insights' },
    { id: 'OWN', label: 'Personal Terminal', icon: User, description: 'Wallet Performance' },
    { id: 'EXPLORE', label: 'Address Scan', icon: Search, description: 'Intelligence Alpha' },
];

export function Sidebar() {
    const { mode, setMode } = useDashboardStore();

    return (
        <aside className="h-[calc(100vh-4rem)] w-64 border-r border-[#1a1c1e] bg-[#0a0b0c] hidden md:flex flex-col sticky top-16">
            <div className="flex-1 overflow-y-auto scrollbar-hide py-8">
                <div className="px-4">
                    <div className="flex items-center gap-2 px-4 mb-8">
                        <Terminal className="h-3 w-3 text-primary" />
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                            Terminal Scopes
                        </h2>
                    </div>
                    
                    <nav className="space-y-1">
                        {mainNavItems.map((item) => {
                            const isActive = mode === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setMode(item.id as any)}
                                    className={cn(
                                        "w-full group relative flex flex-col items-start gap-1 rounded-lg px-4 py-3 text-left transition-all duration-200",
                                        isActive 
                                            ? "bg-primary/5 text-primary" 
                                            : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn(
                                                "h-4 w-4 transition-colors",
                                                isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300"
                                            )} />
                                            <span className="font-display font-medium text-sm tracking-tight">
                                                {item.label}
                                            </span>
                                        </div>
                                        {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                                    </div>
                                    <p className={cn(
                                        "text-[10px] ml-7 font-medium transition-colors opacity-60",
                                        isActive ? "text-primary/70" : "text-slate-500"
                                    )}>
                                        {item.description}
                                    </p>
                                    
                                    {isActive && (
                                        <div className="absolute left-1 h-6 w-0.5 rounded-full bg-primary" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
            
            <div className="p-4 border-t border-[#1a1c1e] bg-[#0d0e10]/50">
                <div className="rounded-xl bg-[#121417] p-4 border border-white/[0.04]">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Live Engine
                            </p>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500">Normal</span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-tight">Latency</span>
                            <span className="text-[9px] font-mono text-slate-300">12ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-tight">Session Alpha</span>
                            <span className="text-[9px] font-mono text-slate-300">0.84%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
