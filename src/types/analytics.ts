export interface PerformanceMetrics {
    totalTrades: number;
    winRate: number; // 0-1
    profitFactor: number;
    totalPnl: number;
    averageWin: number;
    averageLoss: number;
    largestWin: number;
    largestLoss: number;
    currentDrawdown: number;
    maxDrawdown: number;
    sharpeRatio?: number;
}

export interface PortfolioMetrics {
    totalValue: number;
    availableBalance: number;
    usedMargin: number;
    unrealizedPnl: number;
    dailyReturn: number;
}
