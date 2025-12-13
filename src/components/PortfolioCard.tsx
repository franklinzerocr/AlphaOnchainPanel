"use client";

import React, { useMemo } from "react";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

function fmt(n: number) {
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

export function PortfolioCard({ rows }: { rows: TokenBalanceRow[] }) {
  const { totalUsd, top } = useMemo(() => {
    const total = rows.reduce((acc, r) => acc + r.usdValue, 0);
    const topToken =
      rows
        .filter((r) => r.usdValue > 0)
        .sort((a, b) => b.usdValue - a.usdValue)[0]?.symbol ?? "—";
    return { totalUsd: total, top: topToken };
  }, [rows]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
        <div className="text-xs text-slate-400">Portfolio (USD)</div>
        <div className="mt-1 font-mono text-lg font-semibold">${fmt(totalUsd)}</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
        <div className="text-xs text-slate-400">Top asset</div>
        <div className="mt-1 text-lg font-semibold">{top}</div>
      </div>
    </div>
  );
}
