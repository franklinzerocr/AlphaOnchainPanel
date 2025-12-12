// src/components/TokenTable.tsx
"use client";

import React from "react";
import { formatTokenAmount } from "@/lib/format";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

export function TokenTable({
  rows,
}: {
  rows: TokenBalanceRow[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800/60">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/30 text-xs text-slate-400">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Token</th>
            <th className="px-3 py-2 text-right font-medium">Balance</th>
            <th className="px-3 py-2 text-right font-medium">USD</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const balance = formatTokenAmount(r.amount, r.decimals, 6);
            const usd =
              r.usdHint && r.amount !== undefined
                ? formatTokenAmount(r.amount, r.decimals, 2)
                : "—";

            return (
              <tr key={r.symbol} className="border-t border-slate-800/60">
                <td className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{r.symbol}</span>
                    <span className="text-xs text-slate-400">{r.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs md:text-sm">
                  {balance}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs md:text-sm">
                  {usd}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
