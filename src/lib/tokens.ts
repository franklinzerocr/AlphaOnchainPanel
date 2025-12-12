// src/lib/tokens.ts
export type TrackedToken = {
  symbol: string;
  name: string;
  address?: `0x${string}`; // undefined => native ETH
  decimals: number;
  // For MVP: only stablecoins have reliable USD without an oracle
  usdHint?: number; // optional, e.g., 1 for USDC/DAI
};

export const SEPOLIA_TOKENS: TrackedToken[] = [
  { symbol: "ETH", name: "Ether", decimals: 18 },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    usdHint: 1,
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0xff34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
    decimals: 18,
    usdHint: 1,
  },
];
