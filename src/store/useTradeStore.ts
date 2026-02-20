import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trade, TradeFilter } from '@/types/trade';

interface TradeState {
    trades: Trade[];
    filter: TradeFilter;
    isLoading: boolean;
    addTrade: (trade: Trade) => void;
    updateTrade: (id: string, updates: Partial<Trade>) => void;
    setFilter: (filter: TradeFilter) => void;
    fetchTrades: () => Promise<void>; // Placeholder for async fetch
}

export const useTradeStore = create<TradeState>()(
    persist(
        (set, get) => ({
            trades: [],
            filter: {},
            isLoading: false,
            addTrade: (trade) => set((state) => ({ trades: [trade, ...state.trades] })),
            updateTrade: (id, updates) =>
                set((state) => ({
                    trades: state.trades.map((t) => (t.id === id ? { ...t, ...updates } : t)),
                })),
            setFilter: (filter) => set({ filter }),
            fetchTrades: async () => {
                // TODO: Implement actual fetching logic
                set({ isLoading: true });
                setTimeout(() => {
                    set({ isLoading: false });
                }, 1000);
            },
        }),
        {
            name: 'trade-storage',
        }
    )
);
