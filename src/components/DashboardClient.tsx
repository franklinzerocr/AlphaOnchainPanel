"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { LayoutShell } from "@/components/LayoutShell";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { TokenTable } from "@/components/TokenTable";
import { PortfolioCard } from "@/components/PortfolioCard";
import { NetworkStatusCard } from "@/components/NetworkStatusCard";
import { SwapPanel } from "@/components/SwapPanel";

export function DashboardClient() {
  // Prevent SSR/client hydration mismatch: render a stable placeholder until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { isConnected, chainOk, isLoading, error, rows } = useTokenBalances();

  return (
    <LayoutShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
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
            {!mounted ? (
              <div className="text-xs text-slate-400">Loading balances…</div>
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
                <PortfolioCard rows={rows} />
                <TokenTable rows={rows} />
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card title="Swap (Sepolia)" subtitle="ETH → USDC (Uniswap V2)">
            <SwapPanel />
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
