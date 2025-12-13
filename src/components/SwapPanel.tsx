"use client";

import React, { useEffect, useState } from "react";
import { useSwap } from "@/hooks/useSwap";

export function SwapPanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { amountEth, setAmountEth, state, quote, swap, chainOk, isConnected } =
    useSwap();

  // Stable SSR + first client render
  if (!mounted) {
    return (
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Amount (ETH)</label>
          <input
            className="w-full rounded-xl border border-slate-800/70 bg-slate-950/30 px-3 py-2 text-sm outline-none"
            placeholder="0.01"
            value=""
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled
            className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Get Quote
          </button>
          <button
            type="button"
            disabled
            className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Swap to USDC
          </button>
        </div>

        <div className="text-xs text-slate-500">Loading…</div>
      </div>
    );
  }

  const busy = state.status === "checking" || state.status === "pending";
  const canQuote = Boolean(isConnected && chainOk && !busy);
  const canSwap = Boolean(
    isConnected && chainOk && state.status === "ready" && !busy
  );

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Amount (ETH)</label>
        <input
          className="w-full rounded-xl border border-slate-800/70 bg-slate-950/30 px-3 py-2 text-sm outline-none"
          placeholder="0.01"
          inputMode="decimal"
          value={amountEth}
          onChange={(e) => setAmountEth(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={quote}
          disabled={!canQuote}
          className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/60 disabled:opacity-50"
        >
          Get Quote
        </button>

        <button
          type="button"
          onClick={swap}
          disabled={!canSwap}
          className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/60 disabled:opacity-50"
        >
          Swap to USDC
        </button>
      </div>

      {/* Status */}
      {state.status === "idle" ? (
        <div className="text-xs text-slate-500">
          Enter an amount and request a quote.
        </div>
      ) : state.status === "checking" ? (
        <div className="text-xs text-slate-500">Checking pool & quoting…</div>
      ) : state.status === "ready" ? (
        <div className="text-xs text-slate-500">
          Quote ready. Min out applied (1% slippage).
        </div>
      ) : state.status === "pending" ? (
        <div className="text-xs text-slate-500 break-words">
          Pending: {state.hash}
        </div>
      ) : state.status === "success" ? (
        <div className="text-xs text-emerald-400 break-words">
          Success: {state.hash}
        </div>
      ) : (
        <div className="text-xs text-red-400">{state.message}</div>
      )}
    </div>
  );
}
