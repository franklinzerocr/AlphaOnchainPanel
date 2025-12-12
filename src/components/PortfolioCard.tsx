// src/components/PortfolioCard.tsx
"use client";

import React from "react";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";
import { formatTokenAmount } from "@/lib/format";

export function PortfolioCard({ rows }: { rows: TokenBalanceRow[] }) {
  const stables = rows.filter((r) => r.usdHint === 1);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
        <div className="text-xs text-slate-400">
          USD (stablecoins only)
        </div>

        <div className="mt-1 text-sm text-slate-200">
          {stables.length
            ? "Derived from USDC/DAI balances"
            : "—"}
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
          {stables.map((s) => (
            <span
              key={s.symbol}
              className="rounded-lg border border-slate-800/60 bg-slate-900/30 px-2 py-1"
            >
              {s.symbol}: {formatTokenAmount(s.amount, s.decimals, 2)}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        ETH USD pricing will be added later via a price feed (CoinGecko or an
        on-chain oracle). MVP avoids hardcoded market prices.
      </p>
    </div>
  );
}
