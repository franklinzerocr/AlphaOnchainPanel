"use client";

import React from "react";
import { Card } from "@/components/Card";
import { LayoutShell } from "@/components/LayoutShell";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { TokenTable } from "@/components/TokenTable";
import { PortfolioCard } from "@/components/PortfolioCard";
import { NetworkStatusCard } from "@/components/NetworkStatusCard";


export function DashboardClient() {
  const { isConnected, chainOk, isLoading, error, rows } = useTokenBalances();

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
            {!isConnected ? (
              <div className="text-xs text-slate-400">Connect your wallet to load balances.</div>
            ) : error ? (
              <div className="text-xs text-red-400 break-words">{error.message}</div>
            ) : isLoading ? (
              <div className="text-xs text-slate-400">Loading balances…</div>
            ) : (
              <div className="space-y-3">
                {!chainOk ? (
                  <div className="text-xs text-slate-400">
                    ERC20 balances are configured for <b>Sepolia</b>. Switch network to see USDC/DAI.
                  </div>
                ) : null}
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
          <Card title="Network status" subtitle="Block number, gas price, RPC health">
            <NetworkStatusCard />
          </Card>

        </div>
      </div>
    </LayoutShell>
  );
}
