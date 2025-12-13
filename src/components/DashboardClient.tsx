"use client";

import React, { useState } from "react";
import { Card } from "@/components/Card";
import { LayoutShell } from "@/components/LayoutShell";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { TokenTable } from "@/components/TokenTable";
import { PortfolioCard } from "@/components/PortfolioCard";
import { NetworkStatusCard } from "@/components/NetworkStatusCard";
import { SwapPanel } from "@/components/SwapPanel";
import { useIsClient } from "@/hooks/useIsClient";
import { PortfolioAllocationChart } from "@/components/PortfolioAllocationChart";



export function DashboardClient() {
  const isClient = useIsClient();
  const [justUpdated, setJustUpdated] = useState(false);
  const { isConnected, chainOk, isLoading, error, rows, refetch } = useTokenBalances();


  return (
    <LayoutShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start">
        <div className="md:col-span-5">
          <Card
            title="Wallet"
            subtitle="Connect wallet and show address / chain / status"
          >
            <WalletConnectButton />
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Portfolio" subtitle="ETH + ERC20 balances (Sepolia)">
            {!isClient ? (
              <div className="space-y-3">
                <div className="skeleton h-16 w-full" />
                <div className="skeleton h-40 w-full" />
                <div className="skeleton h-40 w-full" />
              </div>
            ) : !isConnected ? (
              <div className="text-xs text-slate-400">
                Connect your wallet to load balances.
              </div>
            ) : error ? (
              <div className="text-xs text-red-400 break-words">
                {error.message}
              </div>
            ) : isLoading ? (
              <div className="text-xs text-slate-400">Loading balances…</div>
            ) : (
              <div className="space-y-3">
                {!chainOk ? (
                  <div className="text-xs text-slate-400">
                    ERC20 balances are configured for <b>Sepolia</b>. Switch
                    network to see USDC/DAI.
                  </div>
                ) : null}
                {justUpdated ? (
                  <div className="text-xs text-emerald-400">Updated!</div>
                ) : null} 
                <PortfolioCard rows={rows} />
                <PortfolioAllocationChart rows={rows} />
                <TokenTable rows={rows} />
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Swap (Sepolia)" subtitle="ETH → USDC (Uniswap V2)">
            <SwapPanel
                onSwapSuccess={async () => {
                  await refetch();
                  setJustUpdated(true);
                  setTimeout(() => setJustUpdated(false), 1500);
                }}
              />
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card
            title="Network status"
            subtitle="Block number, gas price, RPC health"
          >
            <NetworkStatusCard />
          </Card>
        </div>
      </div>
    </LayoutShell>
  );
}
