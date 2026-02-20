'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, useState } from 'react';
import { AppWalletProvider } from '@/components/wallet/WalletProvider';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AppWalletProvider>
                {children}
            </AppWalletProvider>
        </QueryClientProvider>
    );
};
