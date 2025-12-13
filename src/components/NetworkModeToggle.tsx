"use client";

import React from "react";
import { useNetworkMode } from "@/hooks/useNetworkMode";

export function NetworkModeToggle() {
  const { mode, setMode, mainnetAllowed } = useNetworkMode();

  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        onClick={() => setMode("testnet")}
        className={`rounded-lg border px-2 py-1 ${
          mode === "testnet"
            ? "border-slate-600 bg-slate-900/60 text-slate-100"
            : "border-slate-800/60 bg-slate-950/30 text-slate-400 hover:bg-slate-900/30"
        }`}
      >
        Testnet
      </button>

      <button
        onClick={() => setMode("mainnet")}
        disabled={!mainnetAllowed}
        title={
          mainnetAllowed
            ? "Mainnet mode (real funds)"
            : "Mainnet is disabled in this deployment"
        }
        className={`rounded-lg border px-2 py-1 ${
          mode === "mainnet"
            ? "border-amber-500/60 bg-amber-950/30 text-amber-200"
            : "border-slate-800/60 bg-slate-950/30 text-slate-400 hover:bg-slate-900/30"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Mainnet
      </button>
    </div>
  );
}
