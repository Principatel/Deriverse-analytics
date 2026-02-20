'use client';

import { 
  TrendingUp, Activity, Zap, Shield, Target, PieChart, 
  LineChart, Microscope, ShieldCheck, Search, Database,
  ArrowRight, Globe, Lock, BookOpen, Filter, BarChart3,
  Clock, Receipt, Percent, MousePointer2, Timer, Wallet,
  ChevronRight, BrainCircuit, LogOut
} from 'lucide-react';
import { useState } from 'react';

// Dashboard Components
import { StatsCard } from '@/components/dashboard/StatsCard';
import { LiveSolPriceCard } from '@/components/dashboard/LiveSolPriceCard';
import { LiveWalletBalanceCard } from '@/components/dashboard/LiveWalletBalanceCard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';

// Analytics & Portfolio Components
import { PerformanceMetrics } from '@/components/portfolio/PerformanceMetrics';
import { AllocationChart } from '@/components/portfolio/AllocationChart';
import { RiskMetrics } from '@/components/analytics/RiskMetrics';
import { AdvancedMetrics } from '@/components/analytics/AdvancedMetrics';
import { FeeBreakdown } from '@/components/analytics/FeeBreakdown';
import { TimeOfDayAnalysis } from '@/components/analytics/TimeOfDayAnalysis';

// Personal/Journal Components
import { PositionsTable } from '@/components/positions/PositionsTable';
import { TradeForm } from '@/components/journal/TradeForm';
import { TradeList } from '@/components/journal/TradeList';
import { WalletButton } from '@/components/wallet/WalletButton';

// Types and Hooks
import { formatCurrency, formatNumber, truncateAddress } from '@/lib/utils/format';
import { useWalletActivity } from '@/hooks/useWalletActivity';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { mode, exploreAddress, setExploreAddress, timeframe } = useDashboardStore();
  const [tempAddress, setTempAddress] = useState(exploreAddress);

  const effectiveAddress = mode === 'OWN' ? address : (mode === 'EXPLORE' ? exploreAddress : undefined);
  const isGeneralMode = mode === 'GENERAL';
  const isOwnMode = mode === 'OWN';
  const activity = useWalletActivity(effectiveAddress, isGeneralMode, timeframe);

  const handleExploreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExploreAddress(tempAddress);
  };

  return (
    <div className="space-y-12 pb-24 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      
      {/* 1. PROFESSIONAL HEADER SECTION */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4 pb-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2">
                <BrainCircuit className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Quant Intelligence</span>
             </div>
             <div className="h-px w-8 bg-white/10" />
             <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">Terminal Scope: {mode}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none">
              {mode === 'GENERAL' && <>Aggregated <span className="text-primary italic">Protocol Insights</span></>}
              {mode === 'OWN' && <>Personal <span className="text-primary italic">Performance terminal</span></>}
              {mode === 'EXPLORE' && <>Analytical <span className="text-primary italic">Scan Intelligence</span></>}
            </h1>
            <p className="text-slate-400 text-base max-w-2xl font-normal leading-relaxed">
              {mode === 'GENERAL' && "Real-time institutional-grade data for the Deriverse perpetual ecosystem. Cross-protocol liquidity and volatility analysis."}
              {mode === 'OWN' && "Quantitative breakdown of your on-chain trading behavior, risk indices, and pnl curvature."}
              {mode === 'EXPLORE' && "Deep-scan address behavior. Reveal win-rates, session biases, and execution strategies of any Solana participant."}
            </p>
          </div>

          {mode === 'OWN' && isConnected && (
            <div className="flex items-center gap-3 max-w-lg mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                        <Wallet className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-0.5">Connected Wallet</p>
                        <p className="text-sm font-mono text-white">{truncateAddress(address?.toString() || '', 6)}</p>
                    </div>
                </div>
                <button
                    onClick={() => disconnect()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group"
                >
                    <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                    <span className="text-xs font-bold uppercase tracking-widest text-red-400 group-hover:text-red-300">Disconnect</span>
                </button>
            </div>
          )}

          {mode === 'EXPLORE' && (
            <>
              <form onSubmit={handleExploreSubmit} className="flex gap-2 max-w-lg mt-6">
                  <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input 
                          type="text"
                          value={tempAddress}
                          onChange={(e) => setTempAddress(e.target.value)}
                          placeholder="Scan Solana Address..."
                          className="w-full bg-[#0d0e10] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all outline-none"
                      />
                  </div>
                  <button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-black px-6 rounded-xl font-bold uppercase text-xs tracking-widest transition-all"
                  >
                      Analyze
                  </button>
              </form>
              
              {exploreAddress && (
                <div className="flex items-center gap-3 max-w-lg mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30">
                            <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-primary mb-0.5">Analyzing Address</p>
                            <p className="text-sm font-mono text-white">{truncateAddress(exploreAddress, 8)}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setExploreAddress('');
                            setTempAddress('');
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-500/10 border border-slate-500/20 hover:bg-slate-500/20 transition-all group"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-300">Clear</span>
                    </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-6 pb-2">
           <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">System Load</p>
              <div className="flex items-center gap-2 justify-end">
                 <span className="font-mono text-sm font-bold text-white">0.42%</span>
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
           </div>
           <div className="h-10 w-px bg-white/5" />
           <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Latency</p>
              <p className="font-mono text-sm font-bold text-white">12ms</p>
           </div>
        </div>
      </header>

      {/* 2. AUTHENTICATION SHIELD */}
      {isOwnMode && !isConnected && (
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10]/80 p-12 text-center animate-in fade-in duration-1000">
            <div className="relative z-10 max-w-xl mx-auto space-y-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 border border-primary/20 mb-2">
                    <Lock className="h-8 w-8 text-primary/60" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-medium text-white tracking-tight mb-3">
                        Connect Portfolio
                    </h2>
                    <p className="text-slate-400 text-base font-normal leading-relaxed">
                        To access your personal trading curvature and historical alpha analysis, please authorize your current session.
                    </p>
                </div>
                <div className="flex items-center justify-center pt-2">
                    <WalletButton />
                </div>
                <div className="flex items-center justify-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 pt-4">
                    <div className="flex items-center gap-1.5">
                        <Shield className="h-3 w-3 text-primary/40" />
                        Private Session
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Database className="h-3 w-3 text-primary/40" />
                        On-Chain Sync
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className={cn(
        "space-y-12 transition-all duration-700",
        isOwnMode && !isConnected ? "opacity-20 pointer-events-none blur-md lg:grayscale-[0.8]" : "opacity-100"
      )}>
        {/* DASHBOARD FILTERS */}
        <DashboardFilters />

        {/* EXPLORE MODE EMPTY STATE */}
        {mode === 'EXPLORE' && !exploreAddress && (
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10]/80 p-12 text-center animate-in fade-in duration-1000">
              <div className="relative z-10 max-w-xl mx-auto space-y-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 border border-primary/20 mb-2">
                      <Search className="h-8 w-8 text-primary/60" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-display font-medium text-white tracking-tight mb-3">
                          Enter Address to Analyze
                      </h2>
                      <p className="text-slate-400 text-base font-normal leading-relaxed">
                          Input any Solana wallet address above to reveal deep analytics, trading patterns, and performance metrics.
                      </p>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 pt-4">
                      <div className="flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-primary/40" />
                          Live Analysis
                      </div>
                      <div className="flex items-center gap-1.5">
                          <BarChart3 className="h-3 w-3 text-primary/40" />
                          Performance Metrics
                      </div>
                  </div>
              </div>
          </section>
        )}

        {/* DASHBOARD CONTENT - Hidden in EXPLORE mode when no address is provided */}
        {!(mode === 'EXPLORE' && !exploreAddress) && (
          <>
            {/* STATS OVERVIEW */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {mode === 'GENERAL' ? (
                    <>
                        <StatsCard
                            title="Total Value Locked"
                            value={formatCurrency(68453000)}
                            icon={Database}
                            description="Live aggregated protocol assets"
                            trend={{ value: 14.2, label: 'MoM' }}
                        />
                        <StatsCard
                            title="Cumulative Volume"
                            value={formatCurrency(activity.totalVolume)}
                            icon={TrendingUp}
                            description="Total protocol trade throughput"
                        />
                        <LiveSolPriceCard />
                        <StatsCard
                            title="Cumulative Fees"
                            value={formatCurrency(activity.totalFees)}
                            icon={Receipt}
                            description="Value captured by liquidators"
                            trend={{ value: 4.8, label: 'yield' }}
                        />
                    </>
                ) : (
                    <>
                        <LiveWalletBalanceCard />
                        <StatsCard
                            title="Personal P&L"
                            value={activity.isFetching ? '...' : formatCurrency(activity.totalPnl)}
                            icon={TrendingUp}
                            description={mode === 'OWN' ? "Lifetime realization" : "Target address P&L"}
                            isLoading={activity.isFetching}
                            className={activity.totalPnl >= 0 ? "border-emerald-500/20" : "border-red-500/20"}
                            trend={{ value: activity.totalPnl > 0 ? 12 : -5, label: '30d' }}
                        />
                        <LiveSolPriceCard />
                        <StatsCard
                            title="Trading Volume"
                            value={activity.isFetching ? '...' : formatCurrency(activity.totalVolume)}
                            icon={Activity}
                            isLoading={activity.isFetching}
                            description="Aggregated lifetime volume"
                        />
                    </>
                )}
            </section>

            {/* CORE ANALYTICS ENGINE */}
            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <PerformanceChart 
                        dailyData={activity.performanceDataDaily} 
                        hourlyData={activity.performanceDataHourly} 
                        isLoading={activity.isFetching} 
                    />
                    <AdvancedMetrics data={activity} isLoading={activity.isFetching} />
                    <FeeBreakdown 
                        composition={activity.feeComposition}
                        orderPerformance={activity.orderTypePerformance}
                        totalFees={activity.totalFees}
                        isLoading={activity.isFetching}
                    />
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <TimeOfDayAnalysis data={activity.timeOfDayAnalysis} isLoading={activity.isFetching} />
                    <div className="space-y-4">
                        <h3 className="text-base font-display font-medium text-white tracking-tight flex items-center gap-2">
                            <PieChart className="h-4 w-4 text-primary" /> Sector Weighting
                        </h3>
                        <div className="pro-card p-2 rounded-xl">
                            <AllocationChart />
                        </div>
                    </div>
                    
                    {/* Insights Summary */}
                    <div className="pro-card p-8 rounded-xl relative overflow-hidden group">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-primary" />
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Quantitative Summary</h3>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-normal">
                                {mode === 'GENERAL' && "Protocol execution metrics indicate a high density of limit orders vs. market swaps, suggesting structural stability and professional participation."}
                                {mode === 'OWN' && (isConnected 
                                    ? `Statistical scan reveals a preferred holding period of ${activity.avgDuration}. Variance is within optimal thresholds for current volatility levels.` 
                                    : "Awaiting cryptographic link to perform psychological and technical behavior scan.")}
                                {mode === 'EXPLORE' && (exploreAddress 
                                    ? `Alpha analysis for ${exploreAddress.slice(0,8)}... indicates high session-bias correlated with NY equity hours.`
                                    : "Input a valid Solana address to generate zero-knowledge behavior intelligence.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PERFORMANCE BREAKDOWN */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                    <LineChart className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-display font-semibold text-white tracking-tight">
                        Statistical Breakdown
                    </h2>
                </div>
                <PerformanceMetrics />
            </section>

            {/* HISTORY & RECORDS */}
            {!isGeneralMode && (
                <div className="grid gap-12">
                    <section id="positions" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-display font-semibold text-white tracking-tight leading-none">Net Exposure</h2>
                        </div>
                        <div className="pro-card rounded-xl overflow-hidden">
                            <PositionsTable />
                        </div>
                    </section>

                    <section id="journal" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-display font-semibold text-white tracking-tight leading-none">Execution Journal</h2>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-12 items-start">
                            <div className="lg:col-span-4 lg:sticky lg:top-24">
                                <TradeForm />
                            </div>
                            <div className="lg:col-span-8 space-y-6">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Live Ledger</h3>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-all">Export (TSV)</button>
                                </div>
                                <TradeList />
                            </div>
                        </div>
                    </section>
                </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
