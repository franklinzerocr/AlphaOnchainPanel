"use client";

import React from "react";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

function fmt(n: number) {
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

export function TokenTable({ rows }: { rows: TokenBalanceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.04]">
          <tr className="text-left text-xs text-slate-300">
            <th className="px-3 py-2 font-medium">Token</th>
            <th className="px-3 py-2 font-medium">Balance</th>
            <th className="px-3 py-2 text-right font-medium">USD</th>
            <th className="px-3 py-2 text-right font-medium">%</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows.map((r) => (
            <tr key={r.symbol} className="hover:bg-white/[0.03]">
              <td className="px-3 py-2">
                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-slate-200">
                  {r.symbol}
                </span>
              </td>
              <td className="px-3 py-2 font-mono text-xs text-slate-200">
                {r.balance}
              </td>
              <td className="px-3 py-2 text-right font-mono text-xs text-slate-200">
                {r.usdValue > 0 ? `$${fmt(r.usdValue)}` : "—"}
              </td>
              <td className="px-3 py-2 text-right font-mono text-xs text-slate-200">
                {r.pct > 0 ? `${fmt(r.pct)}%` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
