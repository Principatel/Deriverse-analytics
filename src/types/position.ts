export interface Position {
    assetSymbol: string;
    marketAddress: string;
    direction: 'Long' | 'Short';
    size: number;
    entryPrice: number;
    markPrice: number;
    liquidationPrice: number;
    unrealizedPnl: number;
    unrealizedPnlPercentage: number;
    leverage: number;
    marginUsed: number;
    maintenanceMargin: number;
}

export interface Order {
    id: string;
    marketAddress: string;
    assetSymbol: string;
    type: 'Limit' | 'Market' | 'StopLoss' | 'TakeProfit';
    direction: 'Long' | 'Short';
    price: number;
    triggerPrice?: number;
    size: number;
    status: 'Open' | 'Filled' | 'Cancelled';
    timestamp: number;
}
