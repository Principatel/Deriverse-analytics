'use client';

import { useState, useRef, useEffect } from 'react';
import { 
    Zap, 
    X, 
    Send, 
    Sparkles, 
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';
import { usePriceTicker } from '@/hooks/usePriceTicker';
import { useWalletActivity } from '@/hooks/useWalletActivity';
import { formatCurrency } from '@/lib/utils/format';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function QuantChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Greetings. I am the Deriverse Quant Assistant. How can I assist you with protocol data or technical analysis today?",
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { mode, exploreAddress, timeframe } = useDashboardStore();

    // LIVE DATA HOOKS
    const solPrice = usePriceTicker('SOL');
    const isGeneralMode = mode === 'GENERAL';
    const effectiveAddress = mode === 'EXPLORE' ? exploreAddress : undefined;
    const activity = useWalletActivity(effectiveAddress, isGeneralMode, timeframe);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setShowNudge(false);
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const response = generateResponse(inputValue, mode, exploreAddress, solPrice, activity);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (
        query: string, 
        mode: string, 
        address: string, 
        price: number | null,
        data: any
    ) => {
        const q = query.toLowerCase();
        
        if (q.includes('hello') || q.includes('hi')) {
            return "Hello! I'm ready to analyze any part of the Deriverse ecosystem or specific wallet behavior for you.";
        }

        if (q.includes('price') && (q.includes('sol') || q.includes('solana'))) {
            if (price) {
                return `The current live price of SOL is ${formatCurrency(price)}. This data is streamed real-time from Binance.`;
            }
            return "I'm currently connecting to the price feed. Please hold on a second.";
        }
        
        if (q.includes('pnl') || q.includes('profit')) {
            const pnlStr = data.totalPnl >= 0 ? `+$${data.totalPnl.toLocaleString()}` : `-$${Math.abs(data.totalPnl).toLocaleString()}`;
            if (mode === 'OWN') return `Your current total P&L is ${pnlStr}. This reflects your trading activity across the selected timeframe.`;
            if (mode === 'EXPLORE' && address) return `Analyzing ${address.slice(0, 8)}... Their total P&L is currently ${pnlStr}.`;
            return `Protocol-wide total P&L is currently ${pnlStr}. The ecosystem is showing healthy recursive yield.`;
        }

        if (q.includes('fee') || q.includes('fees')) {
            const feesStr = `$${data.totalFees.toLocaleString()}`;
            return `Total fees generated are currently ${feesStr}. This includes execution, funding, and liquidation captures.`;
        }

        if (q.includes('win rate') || q.includes('winrate')) {
            return `The current win rate is ${data.winRate.toFixed(1)}%. This is calculated based on ${data.tradeCount.toLocaleString()} total executed trades.`;
        }

        if (q.includes('volume')) {
            return `The 24h trading volume is currently $${data.totalVolume.toLocaleString()}. Activity levels are trending ${data.totalVolume > 1000000 ? 'high' : 'stable'}.`;
        }

        if (q.includes('sol') || q.includes('solana')) {
            return "The Solana network is performing optimally with sub-second confirmations. Deriverse utilizes high-speed RPCs for maximum execution efficiency.";
        }

        if (q.includes('latency') || q.includes('speed')) {
            return "System latency is currently at approximately 12ms. This is within institutional trading standards for our decentralized engine.";
        }

        if (q.includes('risk')) {
            return "Risk metrics are derived from drawdown history. We recommend keeping drawdown below 15% for optimal capital preservation.";
        }

        return "That's an interesting question. Based on current protocol telemetry, Deriverse is maintaining strong liquidity depth. Is there any specific metric or trend you'd like me to analyze further?";
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Nudge Tooltip */}
            {!isOpen && showNudge && (
                <div className="absolute bottom-[4.5rem] right-0 w-64 p-4 pro-card rounded-2xl border-primary/30 animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-[0_10px_40px_-10px_rgba(20,184,166,0.4)]">
                    <button 
                        onClick={() => setShowNudge(false)}
                        className="absolute top-2 right-2 text-slate-600 hover:text-white transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-200 font-medium">
                            <span className="text-primary font-bold">Quant AI Ready!</span> Try this to find deep insights directly.
                        </p>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#171717] border-r border-b border-white/10 rotate-45" />
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 w-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative overflow-hidden",
                    isOpen 
                        ? "bg-slate-800 rotate-90 scale-90" 
                        : "bg-gradient-to-br from-primary via-accent to-blue-600 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(20,184,166,0.6)]"
                )}
            >
                {isOpen ? (
                    <X className="h-7 w-7 text-white" />
                ) : (
                    <div className="relative">
                        <Zap className="h-8 w-8 text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all animate-pulse" />
                        <span className="absolute -top-4 -right-4 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                        </span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] h-[520px] pro-card rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500 border-primary/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
                    {/* Header */}
                    <div className="p-5 border-b border-white/5 flex items-center justify-between bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white tracking-tight">Quant Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Engine</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id}
                                className={cn(
                                    "flex flex-col max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div className={cn(
                                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                    msg.role === 'user' 
                                        ? "bg-primary/20 text-white border border-primary/30 rounded-br-none shadow-[0_10px_20px_-10px_rgba(20,184,166,0.3)]" 
                                        : "bg-white/5 text-slate-200 border border-white/10 rounded-bl-none"
                                )}
                                >
                                    {msg.content}
                                </div>
                                <span className="text-[9px] font-bold text-slate-600 uppercase mt-1.5 tracking-widest">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-start gap-2 max-w-[85%]">
                                <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10 rounded-bl-none">
                                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black/40 border-t border-white/5">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about SOL, P&L, Strategy..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600 outline-none"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-black disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest mt-3">
                            Beta Quant Intelligence Interface
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
