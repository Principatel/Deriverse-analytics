'use client';

import { useAppKit, useDisconnect } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { truncateAddress } from '@/lib/utils/format';
import { cn } from '@/lib/utils';
import { LogOut, Copy, Wallet, Check } from 'lucide-react';
import { useState } from 'react';

export function WalletButton() {
    const { open } = useAppKit();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAppKitAccount();
    const [showDropdown, setShowDropdown] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (address) {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setShowDropdown(false);
    };

    if (!isConnected) {
        return (
            <button
                onClick={() => open()}
                className={cn(
                    "relative flex items-center justify-center px-6 py-2 rounded-xl text-sm font-black uppercase italic tracking-tighter transition-all duration-300",
                    "high-vis-text",
                    "bg-primary animate-neon-glow hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                )}
            >
                <span className="relative z-10">Connect Wallet</span>
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={cn(
                    "relative flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black uppercase italic tracking-tighter transition-all duration-300",
                    "high-vis-text bg-white/10 border border-white/20 hover:bg-white/20"
                )}
            >
                <Wallet className="h-4 w-4" />
                <span className="relative z-10">
                    {truncateAddress(address?.toString() || '')}
                </span>
            </button>

            {showDropdown && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowDropdown(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0d0e10]/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/5">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                                Connected Wallet
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-xs font-mono text-slate-300">
                                    {truncateAddress(address?.toString() || '', 8)}
                                </p>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {/* Copy Address */}
                            <button
                                onClick={handleCopy}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
                                )}
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                                    {copied ? 'Copied!' : 'Copy Address'}
                                </span>
                            </button>

                            {/* Disconnect */}
                            <button
                                onClick={handleDisconnect}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-all group"
                            >
                                <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                                <span className="text-sm font-medium text-red-400 group-hover:text-red-300">
                                    Disconnect
                                </span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02]">
                            <p className="text-[9px] font-mono text-slate-500 uppercase text-center">
                                Session Active
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
