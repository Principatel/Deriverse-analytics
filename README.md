# Deriverse Trading Analytics Dashboard

A comprehensive Trading Analytics Dashboard for Deriverse, a Solana-based decentralized trading platform. Built to help traders track performance, analyze patterns, and manage portfolios effectively.

## 🚀 Features

### 1. Dashboard Home
- **Real-time Stats**: Portfolio Value, P&L, Win Rate, and Open Positions.
- **Performance Chart**: Interactive equity curve visualization.
- **Recent Trades**: Quick view of latest trading activity.

### 2. Trade Journal
- **Digital Logbook**: Manually log trades or sync from blockchain.
- **Detailed List**: Filterable list of all historical trades with P&L analysis.

### 3. Portfolio Analysis
- **Asset Allocation**: Visual breakdown of portfolio holdings (Pie Chart).
- **Performance Metrics**: Detailed statistics on returns and profitability.

### 4. Position Management
- **Active Positions**: Real-time tracking of open positions with P&L estimates.
- **Risk Management**: Monitoring of liquidation prices and leverage.

### 5. Advanced Analytics
- **Risk Metrics**: Sharpe Ratio, Drawdown analysis, and Win/Loss ratios.
- **Equity Curve**: Visual representation of account growth over time.

## 🛠 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Charts**: [Recharts](https://recharts.org/)
- **Wallet Connection**: [Reown AppKit](https://reown.com/) (formerly WalletConnect)
- **Blockchain**: Solana Web3.js

## 🎨 Theme

- **Background**: Custom Purple/Gray Gradient (`linear-gradient(90deg, #211F2F, #918CA9)`)
- **Mode**: Optimized Dark Mode for high contrast and readability.

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/deriverse-dashboard.git
    cd deriverse-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your Reown Project ID:
    ```bash
    NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
    ```
    *(You can get a Project ID from [Reown Cloud](https://cloud.reown.com/))*

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
