import { format } from 'date-fns';

export function formatCurrency(value: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

export function formatPercentage(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function truncateAddress(address: string, length: number = 4): string {
    if (!address) return '';
    return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function formatDate(timestamp: number | Date, formatStr: string = 'MMM dd, yyyy HH:mm'): string {
    return format(timestamp, formatStr);
}
