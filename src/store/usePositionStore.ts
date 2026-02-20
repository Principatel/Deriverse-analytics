import { create } from 'zustand';
import { Position, Order } from '@/types/position';

interface PositionState {
    positions: Position[];
    orders: Order[];
    isLoading: boolean;
    // Actions
    setPositions: (positions: Position[]) => void;
    setOrders: (orders: Order[]) => void;
    updatePosition: (assetSymbol: string, updates: Partial<Position>) => void;
    closePosition: (assetSymbol: string) => Promise<void>;
    cancelOrder: (orderId: string) => Promise<void>;
}

export const usePositionStore = create<PositionState>((set) => ({
    positions: [],
    orders: [],
    isLoading: false,
    setPositions: (positions) => set({ positions }),
    setOrders: (orders) => set({ orders }),
    updatePosition: (assetSymbol, updates) =>
        set((state) => ({
            positions: state.positions.map((p) =>
                p.assetSymbol === assetSymbol ? { ...p, ...updates } : p
            ),
        })),
    closePosition: async (assetSymbol) => {
        // TODO: Implement SDK call
        console.log('Closing position', assetSymbol);
        set((state) => ({
            positions: state.positions.filter((p) => p.assetSymbol !== assetSymbol),
        }));
    },
    cancelOrder: async (orderId) => {
        // TODO: Implement SDK call
        console.log('Cancelling order', orderId);
        set((state) => ({
            orders: state.orders.filter((o) => o.id !== orderId),
        }));
    },
}));
