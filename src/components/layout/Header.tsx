'use client';

import Link from 'next/link';
import { BarChart3, ChevronRight } from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Logo } from '@/components/shared/Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#1a1c1e] bg-[#050607]/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all shadow-2xl p-1.5">
             <Logo className="w-full h-full" />
          </div>
          <Link 
            href="/" 
            className="text-lg font-display font-bold tracking-tight text-white uppercase"
          >
            DE<span className="text-primary italic">RI</span>VERSE
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          <div className="h-4 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-200 transition-all cursor-pointer">
             <BarChart3 className="h-3 w-3" />
             Analytics
          </div>
          <ChevronRight className="h-3 w-3 text-slate-700" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
             Quant Terminal
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 leading-none">Market Live</span>
                <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase">v2.4.0-stable</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 leading-none">Security</span>
                <span className="text-[9px] font-mono text-slate-200 mt-1 uppercase italic">AES-256</span>
            </div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <WalletButton />
      </div>
    </header>
  );
}
