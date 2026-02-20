import { create } from 'zustand';

export type DashboardMode = 'GENERAL' | 'OWN' | 'EXPLORE';
export type Timeframe = '7D' | '30D' | '90D' | '1Y' | 'ALL';

interface DashboardState {
    mode: DashboardMode;
    timeframe: Timeframe;
    assetType: string;
    exploreAddress: string;
    setMode: (mode: DashboardMode) => void;
    setTimeframe: (timeframe: Timeframe) => void;
    setAssetType: (asset: string) => void;
    setExploreAddress: (address: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    mode: 'GENERAL',
    timeframe: '30D',
    assetType: 'ALL ASSETS',
    exploreAddress: '',
    setMode: (mode) => set({ mode }),
    setTimeframe: (timeframe) => set({ timeframe }),
    setAssetType: (assetType) => set({ assetType }),
    setExploreAddress: (address) => set({ exploreAddress: address }),
}));
