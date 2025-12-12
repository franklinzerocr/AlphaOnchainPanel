"use client";

import React from "react";
import { Card } from "@/components/Card";
import { LayoutShell } from "@/components/LayoutShell";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { TokenTable } from "@/components/TokenTable";
import { PortfolioCard } from "@/components/PortfolioCard";

export function DashboardClient() {
  const { enabled, chainOk, isLoading, error, rows } = useTokenBalances();

  return (
    <LayoutShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <Card title="Wallet" subtitle="Connect wallet and show address / chain / status">
            <WalletConnectButton />
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Portfolio" subtitle="ETH + ERC20 balances (Sepolia)">
            {!enabled ? (
              <div className="text-xs text-slate-400">Connect your wallet to load balances.</div>
            ) : !chainOk ? (
              <div className="text-xs text-slate-400">Switch to Sepolia to read token balances.</div>
            ) : error ? (
              <div className="text-xs text-red-400 break-words">{error.message}</div>
            ) : isLoading ? (
              <div className="text-xs text-slate-400">Loading balances…</div>
            ) : (
              <div className="space-y-3">
                <PortfolioCard rows={rows} />
                <TokenTable rows={rows} />
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Swap (Sepolia)" subtitle="Minimal ETH → USDC testnet swap module">
            <div className="text-xs text-slate-400">Planned: SwapPanel (writeContract)</div>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card title="Network status" subtitle="Block number, gas estimate, RPC health">
            <div className="text-xs text-slate-400">Planned: NetworkStatusCard</div>
          </Card>
        </div>
      </div>
    </LayoutShell>
  );
}
