import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

export const DEMO_PORTFOLIO: TokenBalanceRow[] = [
  {
    symbol: "ETH",
    name: "Ether",
    balance: "1.42",
    usdValue: 4260,
    pct: 62,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "1,850",
    usdValue: 1850,
    pct: 27,
  },
  {
    symbol: "DAI",
    name: "Dai",
    balance: "760",
    usdValue: 760,
    pct: 11,
  },
];
