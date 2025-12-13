"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

type ChartRow = {
  name: string;
  value: number;
};

function fmtPct(n: number): string {
  return `${n.toFixed(2)}%`;
}

export function PortfolioAllocationChart({
  rows,
}: {
  rows: TokenBalanceRow[];
}) {
  const data: ChartRow[] = useMemo(() => {
    return rows
      .filter((r) => r.pct > 0)
      .map((r) => ({
        name: r.symbol,
        value: r.pct,
      }));
  }, [rows]);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-400 backdrop-blur-xl">
        No allocation data available.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-200">
          Allocation
        </div>
        <div className="text-[11px] text-slate-400">
          Portfolio %
        </div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={46}
              outerRadius={64}
              paddingAngle={2}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={`hsla(${(i * 55) % 360}, 80%, 65%, 0.85)`}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => fmtPct(value)}
              contentStyle={{
                background: "rgba(2,6,23,0.9)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                fontSize: 12,
                color: "rgba(226,232,240,1)",
              }}
              labelStyle={{
                color: "rgba(148,163,184,1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {data.map((d) => (
          <div
            key={d.name}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px] text-slate-300"
          >
            {d.name} · {fmtPct(d.value)}
          </div>
        ))}
      </div>
    </div>
  );
}
