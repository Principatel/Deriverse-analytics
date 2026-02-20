export const getSolanaRpcUrl = () => {
    const url = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;
    // Check if URL exists and is not the placeholder string
    if (url && !url.includes('your-api-key-here')) {
        return url;
    }
    return 'https://api.mainnet-beta.solana.com';
};
