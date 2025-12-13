"use client";

import React from "react";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

function fmt(n?: number) {
  if (n == null) return "—";
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(2);
}

function getBalanceText(row: TokenBalanceRow): string {
  const anyRow = row as unknown as {
    balance?: unknown;
    amount?: unknown;
    formatted?: unknown;
    value?: unknown;
  };

  const candidates = [anyRow.balance, anyRow.amount, anyRow.formatted, anyRow.value];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) return c;
    if (typeof c === "number" && Number.isFinite(c)) return String(c);
    if (typeof c === "bigint") return c.toString();
  }

  return "—";
}

function getUsd(row: TokenBalanceRow): number | null {
  const anyRow = row as unknown as { usdValue?: unknown; usd?: unknown };

  if (typeof anyRow.usdValue === "number" && Number.isFinite(anyRow.usdValue)) {
    return anyRow.usdValue;
  }
  if (typeof anyRow.usd === "number" && Number.isFinite(anyRow.usd)) {
    return anyRow.usd;
  }
  if (typeof anyRow.usd === "string") {
    const cleaned = anyRow.usd.replace(/[^0-9.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function getPct(row: TokenBalanceRow): number | null {
  const anyRow = row as unknown as { pct?: unknown; percentage?: unknown };

  if (typeof anyRow.pct === "number" && Number.isFinite(anyRow.pct)) return anyRow.pct;
  if (typeof anyRow.percentage === "number" && Number.isFinite(anyRow.percentage))
    return anyRow.percentage;

  return null;
}

export function TokenTable({ rows }: { rows: TokenBalanceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/60">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/40">
          <tr className="text-left text-xs text-slate-300">
            <th className="px-3 py-2 font-medium">Token</th>
            <th className="px-3 py-2 font-medium">Balance</th>
            <th className="px-3 py-2 text-right font-medium">USD</th>
            <th className="px-3 py-2 text-right font-medium">%</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/60">
          {rows.map((r) => {
            const bal = getBalanceText(r);
            const usd = getUsd(r);
            const pct = getPct(r);

            return (
              <tr key={r.symbol} className="bg-slate-950/10">
                <td className="px-3 py-2">
                  <span className="rounded-lg border border-slate-800/60 bg-slate-950/40 px-2 py-1 text-xs text-slate-200">
                    {r.symbol}
                  </span>
                </td>

                <td className="px-3 py-2 font-mono text-xs text-slate-200">
                  {bal}
                </td>

                <td className="px-3 py-2 text-right font-mono text-xs text-slate-200">
                  {usd == null ? "—" : `$${fmt(usd)}`}
                </td>

                <td className="px-3 py-2 text-right font-mono text-xs text-slate-200">
                  {pct == null ? "—" : `${fmt(pct)}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
