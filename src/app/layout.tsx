import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Providers } from '@/components/providers/Providers';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Deriverse Analysis | Quant Intelligence',
  description: 'Pro-grade trading analytics terminal for Deriverse protocol',
};

import { QuantChat } from '@/components/chat/QuantChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, outfit.variable, mono.variable)}>
      <body className="font-sans antialiased text-slate-200">
        <Providers>
          <div className="flex min-h-screen flex-col bg-[#050607]">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 lg:p-10 overflow-auto text-shadow-pro">
                {children}
              </main>
            </div>
          </div>
          <QuantChat />
        </Providers>
      </body>
    </html>
  );
}
