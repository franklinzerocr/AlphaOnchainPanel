"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

// try to extract some percentage or USD-ish weight without assuming exact shape
function getWeight(row: TokenBalanceRow): number {
  const anyRow = row as unknown as { pct?: unknown; usd?: unknown; usdValue?: unknown; usdHint?: unknown };

  if (typeof anyRow.pct === "number" && Number.isFinite(anyRow.pct)) return anyRow.pct;

  if (typeof anyRow.usdValue === "number" && Number.isFinite(anyRow.usdValue)) return anyRow.usdValue;
  if (typeof anyRow.usd === "number" && Number.isFinite(anyRow.usd)) return anyRow.usd;
  if (typeof anyRow.usd === "string") {
    const cleaned = anyRow.usd.replace(/[^0-9.-]/g, "");
    const n = Number(cleaned);
    if (Number.isFinite(n)) return n;
  }

  if (typeof anyRow.usdHint === "number" && Number.isFinite(anyRow.usdHint)) {
    // if you only have hints, at least show relative weights based on hints
    return anyRow.usdHint;
  }

  return 0;
}

function short(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}k`;
  return n.toFixed(2);
}

export function PortfolioAllocationChart({ rows }: { rows: TokenBalanceRow[] }) {
  const data = useMemo(() => {
  const cleaned = rows
    .map((r) => ({ name: r.symbol, value: r.pct }))
    .filter((d) => d.value > 0);

  return cleaned;
}, [rows]);


  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-400 backdrop-blur-xl">
        Allocation chart needs balances with a USD hint (or pct). Connect wallet and load balances.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-200">Allocation</div>
        <div className="text-[11px] text-slate-400">normalized %</div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              innerRadius={46}
              outerRadius={64}
              paddingAngle={2}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={1}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  // do NOT set explicit colors in charts per your preferences; but recharts needs some.
                  // Use CSS currentColor via class? Not possible per-cell. We'll keep a subtle cycle.
                  fill={`hsla(${(i * 55) % 360}, 80%, 65%, 0.85)`}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(2,6,23,0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                fontSize: 12,
                color: "rgba(226,232,240,1)",
              }}
              formatter={(v: any) => [`${short(Number(v))}%`, "Share"]}
              labelStyle={{ color: "rgba(148,163,184,1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {data.slice(0, 6).map((d) => (
          <div
            key={d.name}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px] text-slate-300"
          >
            {d.name} · {short(d.value)}%
          </div>
        ))}
      </div>
    </div>
  );
}
