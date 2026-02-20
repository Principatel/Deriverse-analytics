export type TradeDirection = 'Long' | 'Short';
export type TradeStatus = 'Open' | 'Closed' | 'Liquidated';

export interface Trade {
    id: string;
    txHash: string;
    assetSymbol: string;
    direction: TradeDirection;
    entryPrice: number;
    exitPrice?: number;
    size: number; // In token units
    leverage: number;
    collateral: number;
    pnl: number;
    pnlPercentage: number;
    fee: number;
    openTime: number;
    closeTime?: number;
    status: TradeStatus;
    notes?: string;
    tags?: string[];
}

export interface TradeFilter {
    asset?: string;
    startDate?: number;
    endDate?: number;
    status?: TradeStatus;
}
