"use client";

import React, { useMemo } from "react";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

function fmt(n: number) {
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

// Safely extract a numeric USD value from any row shape.
// Supports: row.usdValue (number) or row.usd (number or string like "$12.34")
function getUsd(row: TokenBalanceRow): number {
  const anyRow = row as unknown as {
    usdValue?: unknown;
    usd?: unknown;
  };

  if (typeof anyRow.usdValue === "number" && Number.isFinite(anyRow.usdValue)) {
    return anyRow.usdValue;
  }

  if (typeof anyRow.usd === "number" && Number.isFinite(anyRow.usd)) {
    return anyRow.usd;
  }

  if (typeof anyRow.usd === "string") {
    const cleaned = anyRow.usd.replace(/[^0-9.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }

  return 0;
}

export function PortfolioCard({ rows }: { rows: TokenBalanceRow[] }) {
  const { totalUsd, top } = useMemo(() => {
    const total = rows.reduce((acc, r) => acc + getUsd(r), 0);

    const topToken =
      rows
        .map((r) => ({ symbol: r.symbol, usd: getUsd(r) }))
        .filter((r) => r.usd > 0)
        .sort((a, b) => b.usd - a.usd)[0]?.symbol ?? "—";

    return { totalUsd: total, top: topToken };
  }, [rows]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-slate-800/60 bg-slate-950/30 p-3">
        <div className="text-xs text-slate-400">Portfolio (USD)</div>
        <div className="mt-1 font-mono text-lg font-semibold">
          ${fmt(totalUsd)}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/60 bg-slate-950/30 p-3">
        <div className="text-xs text-slate-400">Top asset</div>
        <div className="mt-1 text-lg font-semibold">{top}</div>
      </div>
    </div>
  );
}
