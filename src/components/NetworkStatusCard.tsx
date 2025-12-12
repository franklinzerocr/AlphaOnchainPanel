"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useBlockNumber, useChainId, useGasPrice, usePublicClient } from "wagmi";

function shortHex(n?: bigint) {
  if (n === undefined) return "—";
  return n.toString();
}

function formatGwei(wei?: bigint) {
  if (wei === undefined) return "—";
  // gwei = wei / 1e9
  const gwei = Number(wei) / 1e9;
  if (!Number.isFinite(gwei)) return "—";
  return `${gwei.toFixed(2)} gwei`;
}

export function NetworkStatusCard() {
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const block = useBlockNumber({
    watch: true,
    query: { refetchInterval: 7000 },
  });

  const gas = useGasPrice({
    query: { refetchInterval: 15000 },
  });

  const [rpcOk, setRpcOk] = useState<"ok" | "fail" | "checking">("checking");
  const [rpcMs, setRpcMs] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Ping is an external effect (RPC), so state updates belong in the async callback,
    // not synchronously in the effect body.
    async function ping() {
      if (!publicClient) return;

      // Show "checking" when a ping starts (allowed: inside the async callback).
      setRpcOk("checking");

      try {
        const t0 = performance.now();
        await publicClient.getChainId();
        const t1 = performance.now();

        if (cancelled) return;
        setRpcOk("ok");
        setRpcMs(Math.round(t1 - t0));
      } catch {
        if (cancelled) return;
        setRpcOk("fail");
        setRpcMs(null);
      }
    }

    void ping();

    // Subscribe to periodic updates (and clean up on unmount).
    const id = window.setInterval(() => {
      void ping();
    }, 20000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [publicClient]);

  const statusLabel = useMemo(() => {
    if (rpcOk === "checking") return "Checking…";
    if (rpcOk === "ok") return `Healthy${rpcMs !== null ? ` (${rpcMs}ms)` : ""}`;
    return "Degraded";
  }, [rpcOk, rpcMs]);

  return (
    <div className="space-y-3 text-sm">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
          <div className="text-xs text-slate-400">Chain ID</div>
          <div className="mt-1 font-mono">{chainId ?? "—"}</div>
        </div>

        <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
          <div className="text-xs text-slate-400">RPC health</div>
          <div
            className={`mt-1 font-medium ${
              rpcOk === "ok"
                ? "text-emerald-300"
                : rpcOk === "fail"
                ? "text-red-300"
                : "text-slate-200"
            }`}
          >
            {statusLabel}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
          <div className="text-xs text-slate-400">Block</div>
          <div className="mt-1 font-mono">
            {block.isLoading ? "Loading…" : shortHex(block.data)}
          </div>
          {block.error ? (
            <div className="mt-2 break-words text-xs text-red-400">
              {block.error.message}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
          <div className="text-xs text-slate-400">Gas price</div>
          <div className="mt-1 font-mono">
            {gas.isLoading ? "Loading…" : formatGwei(gas.data)}
          </div>
          {gas.error ? (
            <div className="mt-2 break-words text-xs text-red-400">
              {gas.error.message}
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Updates: block ~7s, gas ~15s, RPC ping ~20s.
      </div>
    </div>
  );
}
