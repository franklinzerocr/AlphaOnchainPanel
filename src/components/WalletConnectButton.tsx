"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";

function shortAddress(addr?: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function chainLabel(chainId?: number) {
  if (!chainId) return "Unknown";
  if (chainId === sepolia.id) return "Sepolia";
  if (chainId === mainnet.id) return "Mainnet";
  return `Chain ${chainId}`;
}

export function WalletConnectButton() {
  // Prevent SSR/client mismatch: render a stable placeholder until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  const { switchChain, isPending: isSwitching } = useSwitchChain();

  if (!mounted) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium disabled:opacity-50"
          disabled
        >
          Loading…
        </button>
        <p className="text-xs text-slate-400">Uses injected wallet (MetaMask, Brave, etc).</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/60 disabled:opacity-50"
          onClick={() => connect({ connector: connectors[0] })}
          disabled={isPending || connectors.length === 0}
        >
          {isPending ? "Connecting…" : "Connect Wallet"}
        </button>

        {error ? (
          <p className="text-xs text-red-400 break-words">{error.message}</p>
        ) : (
          <p className="text-xs text-slate-400">
            Uses injected wallet (MetaMask, Brave, etc).
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">Address</div>
            <div className="text-sm font-medium">{shortAddress(address)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Network</div>
            <div className="text-sm font-medium">{chainLabel(chainId)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/60 disabled:opacity-50"
          onClick={() => switchChain({ chainId: sepolia.id })}
          disabled={isSwitching || chainId === sepolia.id}
        >
          {isSwitching ? "Switching…" : "Switch to Sepolia"}
        </button>

        <button
          type="button"
          className="rounded-xl border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/60"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
