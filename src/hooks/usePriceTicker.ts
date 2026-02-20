'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to get live prices from Binance WebSocket
 * @param symbol The ticker symbol (e.g., 'SOL', 'BTC')
 * @returns The current price as a number
 */
export function usePriceTicker(symbol: string = 'SOL') {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const pair = `${symbol.toLowerCase()}usdt`;
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);

        ws.onmessage = (event) => {
            try {
                if (!event.data) return;
                const data = JSON.parse(event.data);
                // 'p' is the price in Binance trade stream
                const newPrice = parseFloat(data.p);
                if (!isNaN(newPrice)) {
                    setPrice(newPrice);
                }
            } catch (error) {
                // Silently handle parse errors during rapid streams
            }
        };

        ws.onerror = () => {
            // Silently handle errors to avoid console noise
            // Binance can be blocked in some regions
        };

        return () => {
            ws.close();
        };
    }, [symbol]);

    return price;
}
