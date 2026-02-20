'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { Timeframe, useDashboardStore } from '@/store/useDashboardStore';
import { getSolanaRpcUrl } from '@/lib/utils/rpc';

export interface PerformancePoint {
    date: string;
    value: number;
    drawdown: number;
}

export interface WalletActivity {
    totalVolume: number;
    totalFees: number;
    dailyPnl: number;
    totalPnl: number;
    winRate: number;
    tradeCount: number;
    avgDuration: string;
    longRatio: number; // 0-100
    largestWin: number;
    largestLoss: number;
    avgWin: number;
    avgLoss: number;
    openInterest: number;
    maxDrawdown: number;
    currentDrawdown: number;
    isFetching: boolean;
    performanceDataDaily: PerformancePoint[];
    performanceDataHourly: PerformancePoint[];
    feeComposition: { type: string; amount: number; percentage: number }[];
    orderTypePerformance: { type: string; winRate: number; count: number }[];
    timeOfDayAnalysis: { hour: string; pnl: number }[];
    label: string;
}

export function useWalletActivity(overrideAddress?: string, isGeneral: boolean = false, timeframe: Timeframe = '30D') {
    const { address: connectedAddress, isConnected } = useAppKitAccount();
    const { assetType } = useDashboardStore();
    const effectiveAddress = overrideAddress || (isGeneral ? 'ProtocolStats' : connectedAddress);
    
    const [activity, setActivity] = useState<WalletActivity>({
        totalVolume: 0,
        totalFees: 0,
        dailyPnl: 0,
        totalPnl: 0,
        winRate: 0,
        tradeCount: 0,
        avgDuration: '0h',
        longRatio: 50,
        largestWin: 0,
        largestLoss: 0,
        avgWin: 0,
        avgLoss: 0,
        openInterest: 0,
        maxDrawdown: 0,
        currentDrawdown: 0,
        isFetching: false,
        performanceDataDaily: [],
        performanceDataHourly: [],
        feeComposition: [],
        orderTypePerformance: [],
        timeOfDayAnalysis: [],
        label: 'Idle',
    });

    const generateSeed = (addr: string) => {
        const combined = addr + (assetType || 'ALL');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = (hash << 5) - hash + combined.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    };

    const getRangeLength = (tf: Timeframe) => {
        switch (tf) {
            case '7D': return 7;
            case '30D': return 30;
            case '90D': return 90;
            case '1Y': return 365;
            case 'ALL': return 500;
            default: return 30;
        }
    };

    useEffect(() => {
        const rangeLength = getRangeLength(timeframe);
        // Add a multiplier based on asset type to simulate different data scales
        const assetMultiplier = assetType === 'ALL ASSETS' ? 1 : 0.4 + (generateSeed(assetType) % 80) / 100;
        
        if (isGeneral) {
            // Simulated Protocol-wide data
            const dailyPerf = Array.from({ length: rangeLength }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (rangeLength - 1 - i));
                const val = (850000 + (Math.sin(i * 0.2) * 50000) + (i * 5000)) * assetMultiplier;
                return {
                    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    value: val,
                    drawdown: Math.max(0, ((850000 + (i * 5000)) * assetMultiplier - val) / 5000)
                };
            });

            const hourlyPerf = Array.from({ length: 24 }).map((_, i) => {
                const val = (850000 + (Math.sin(i * 0.5) * 10000) + (i * 500)) * assetMultiplier;
                return {
                    date: `${i}:00`,
                    value: val,
                    drawdown: Math.max(0, ((850000 + (i * 500)) * assetMultiplier - val) / 1000)
                };
            });

            setActivity({
                totalVolume: 425600000 * (rangeLength / 30) * assetMultiplier,
                totalFees: 852000 * (rangeLength / 30) * assetMultiplier,
                dailyPnl: 145230 * assetMultiplier,
                totalPnl: 8452000 * (rangeLength / 30) * assetMultiplier,
                winRate: 64.2,
                tradeCount: Math.floor(142300 * (rangeLength / 30) * assetMultiplier),
                avgDuration: '4h 12m',
                longRatio: 58,
                largestWin: 245000 * assetMultiplier,
                largestLoss: 112000 * assetMultiplier,
                avgWin: 1240,
                avgLoss: 850,
                openInterest: 18420 * assetMultiplier,
                maxDrawdown: 14.2,
                currentDrawdown: 2.1,
                isFetching: false,
                performanceDataDaily: dailyPerf,
                performanceDataHourly: hourlyPerf,
                feeComposition: [
                    { type: 'Execution', amount: 542000 * (rangeLength/30) * assetMultiplier, percentage: 63 },
                    { type: 'Funding', amount: 210000 * (rangeLength/30) * assetMultiplier, percentage: 25 },
                    { type: 'Liquidation', amount: 100000 * (rangeLength/30) * assetMultiplier, percentage: 12 },
                ],
                orderTypePerformance: [
                    { type: 'Market', winRate: 61, count: Math.floor(85000 * (rangeLength/30) * assetMultiplier) },
                    { type: 'Limit', winRate: 68, count: Math.floor(42000 * (rangeLength/30) * assetMultiplier) },
                    { type: 'Stop', winRate: 52, count: Math.floor(15300 * (rangeLength/30) * assetMultiplier) },
                ],
                timeOfDayAnalysis: Array.from({ length: 6 }).map((_, i) => ({
                    hour: `${i * 4}:00`,
                    pnl: ((Math.sin(i) * 10000) + 5000) * assetMultiplier
                })),
                label: assetType === 'ALL ASSETS' ? 'Protocol Wide' : `${assetType} Analysis`,
            });
            return;
        }

        if (!effectiveAddress) {
            setActivity(prev => ({ ...prev, isFetching: false }));
            return;
        }

        const fetchActivity = async () => {
            setActivity(prev => ({ ...prev, isFetching: true }));

            try {
                const rpcUrl = getSolanaRpcUrl();
                const connection = new Connection(rpcUrl, { commitment: 'confirmed', wsEndpoint: '' });
                
                let signatures: any[] = [];
                try {
                    const publicKey = new PublicKey(effectiveAddress);
                    signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 });
                } catch (e) {}
                
                const seed = generateSeed(effectiveAddress);
                const combinedMultiplier = (rangeLength / 30) * assetMultiplier;
                const baseWinRate = 45 + (seed % 45); 
                const baseVolume = (seed % 2000) * 45 * combinedMultiplier;
                const realVolume = baseVolume + (signatures.length * 500 * combinedMultiplier);
                const pnlDir = (seed % 2 === 0) ? 1 : -1;
                const calculatedDailyPnl = pnlDir * (seed % 800) * (signatures.length > 5 ? 2.2 : 0.9) * assetMultiplier;

                const dailyPerf = Array.from({ length: rangeLength }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (rangeLength - 1 - i));
                    const val = (5000 + (seed % 1000) + (Math.sin(i * 0.3 + seed) * 400) + (i * 150)) * assetMultiplier;
                    return {
                        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        value: val,
                        drawdown: Math.max(0, ((5000 + (seed % 1000) + (i * 150)) * assetMultiplier - val) / 100)
                    };
                });

                const hourlyPerf = Array.from({ length: 24 }).map((_, i) => {
                    const val = (5000 + (seed % 1000) + (Math.sin(i * 0.8 + seed) * 200) + (i * 20)) * assetMultiplier;
                    return {
                        date: `${i}:00`,
                        value: val,
                        drawdown: Math.max(0, ((5000 + (seed % 1000) + (i * 20)) * assetMultiplier - val) / 50)
                    };
                });

                setActivity({
                    totalVolume: realVolume,
                    totalFees: realVolume * 0.001,
                    dailyPnl: calculatedDailyPnl,
                    totalPnl: (((seed % 5000) + (signatures.length * 100)) * combinedMultiplier),
                    winRate: baseWinRate,
                    tradeCount: Math.floor((12 + (signatures.length * 2)) * combinedMultiplier),
                    avgDuration: `${(seed % 5) + 1}h ${(seed % 60)}m`,
                    longRatio: 40 + (seed % 35),
                    largestWin: ((seed % 800) + 200) * assetMultiplier,
                    largestLoss: ((seed % 500) + 100) * assetMultiplier,
                    avgWin: (seed % 200) + 50,
                    avgLoss: (seed % 150) + 40,
                    openInterest: signatures.length > 0 ? ((seed % 6) + 1) * assetMultiplier : 0,
                    maxDrawdown: (seed % 150) / 10,
                    currentDrawdown: (seed % 30) / 10,
                    isFetching: false,
                    performanceDataDaily: dailyPerf,
                    performanceDataHourly: hourlyPerf,
                    feeComposition: [
                        { type: 'Execution', amount: realVolume * 0.0006, percentage: 60 },
                        { type: 'Funding', amount: realVolume * 0.0003, percentage: 30 },
                        { type: 'Slippage', amount: realVolume * 0.0001, percentage: 10 },
                    ],
                    orderTypePerformance: [
                        { type: 'Market', winRate: baseWinRate - 5, count: Math.floor(signatures.length * 0.7 * combinedMultiplier) },
                        { type: 'Limit', winRate: baseWinRate + 4, count: Math.floor(signatures.length * 0.3 * combinedMultiplier) },
                    ],
                    timeOfDayAnalysis: Array.from({ length: 6 }).map((_, i) => ({
                        hour: `${i * 4}:00`,
                        pnl: (Math.sin(i + seed) * 200) + 50
                    })),
                    label: overrideAddress ? `Explorer: ${effectiveAddress.slice(0,4)}...` : 'Personal',
                });
            } catch (error) {
                console.error('Error fetching wallet activity:', error);
                setActivity(prev => ({ ...prev, isFetching: false }));
            }
        };

        fetchActivity();
    }, [effectiveAddress, isGeneral, isConnected, timeframe, assetType]);

    return activity;
}
