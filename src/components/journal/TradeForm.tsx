'use client';

import { useState } from 'react';
import { useTradeStore } from '@/store/useTradeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trade, TradeDirection, TradeStatus } from '@/types/trade';
import { Rocket, Target, Zap, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TradeForm() {
    const addTrade = useTradeStore((state) => state.addTrade);
    const [formData, setFormData] = useState({
        assetSymbol: 'SOL-PERP',
        direction: 'Long' as TradeDirection,
        entryPrice: '',
        size: '',
        leverage: '10',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTrade: Trade = {
            id: crypto.randomUUID(),
            txHash: 'manual-' + Date.now(),
            assetSymbol: formData.assetSymbol,
            direction: formData.direction,
            entryPrice: parseFloat(formData.entryPrice) || 0,
            size: parseFloat(formData.size) || 0,
            leverage: parseFloat(formData.leverage) || 1,
            collateral: (parseFloat(formData.entryPrice || '0') * parseFloat(formData.size || '0')) / parseFloat(formData.leverage || '1'),
            pnl: 0,
            pnlPercentage: 0,
            fee: 0,
            openTime: Date.now(),
            status: 'Open' as TradeStatus,
        };
        addTrade(newTrade);
        setFormData({ ...formData, entryPrice: '', size: '' });
    };

    return (
        <Card className="glass-card border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Rocket className="h-20 w-20 text-primary rotate-45" />
            </div>
            
            <CardHeader className="border-b border-white/5 bg-white/[0.02] py-4">
                <CardTitle className="text-lg font-black italic uppercase tracking-tighter text-white">
                    Submit <span className="text-primary">Journal</span> Entry
                </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Direction Toggle */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Execution Mode</label>
                        <div className="flex gap-3 p-1 rounded-2xl bg-black border border-white/5">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, direction: 'Long' })}
                                className={cn(
                                    "flex-1 py-3 rounded-xl font-black uppercase italic tracking-tighter transition-all text-xs",
                                    formData.direction === 'Long' 
                                        ? "bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                                        : "text-slate-500 hover:text-white"
                                )}
                            >
                                Long Entry
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, direction: 'Short' })}
                                className={cn(
                                    "flex-1 py-3 rounded-xl font-black uppercase italic tracking-tighter transition-all text-xs",
                                    formData.direction === 'Short' 
                                        ? "bg-red-500 text-black shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                                        : "text-slate-500 hover:text-white"
                                )}
                            >
                                Short Entry
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Configuration</label>
                         <div className="relative">
                            <Target className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                value={formData.assetSymbol}
                                onChange={(e) => setFormData({ ...formData, assetSymbol: e.target.value })}
                                placeholder="ASSET-SYMBOL"
                                className="pl-10 h-11 bg-black/50 border-white/10 text-white font-mono uppercase focus:ring-primary focus:border-primary/50"
                            />
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Entry Price</label>
                            <Input
                                type="number"
                                value={formData.entryPrice}
                                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                                placeholder="0.00"
                                className="h-11 bg-black/50 border-white/10 text-white font-mono focus:ring-primary focus:border-primary/50"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Size (Units)</label>
                            <Input
                                type="number"
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                placeholder="0.00"
                                className="h-11 bg-black/50 border-white/10 text-white font-mono focus:ring-primary focus:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Leverage Factor</label>
                            <span className="text-xs font-mono font-bold text-primary">{formData.leverage}x</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={formData.leverage}
                            onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 text-xs">
                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-slate-400 font-medium">
                            Positions are logged to local storage. Advanced analytics will calculate your win rate and max drawdown based on these entries.
                        </p>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-black uppercase italic tracking-tighter rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:-translate-y-0.5">
                       <Zap className="mr-2 h-4 w-4 fill-current" />
                       Confirm Entry
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
