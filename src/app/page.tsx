// src/app/page.tsx
import { Card } from "@/components/Card";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { LayoutShell } from "@/components/LayoutShell";

export default function HomePage() {
  return (
    <LayoutShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <Card
            title="Wallet"
            subtitle="Connect wallet and show address / chain / status"
          >
            <Card title="Wallet" subtitle="Connect wallet and show address / chain / status">
              <WalletConnectButton />
            </Card>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card
            title="Portfolio"
            subtitle="ETH + ERC20 balances and portfolio breakdown"
          >
            <div className="text-xs text-slate-400">
              Next step: TokenTable + PortfolioCard
            </div>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card
            title="Swap (Sepolia)"
            subtitle="Minimal ETH → USDC testnet swap module"
          >
            <div className="text-xs text-slate-400">
              Planned: SwapPanel (writeContract)
            </div>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card
            title="Network status"
            subtitle="Block number, gas estimate, RPC health"
          >
            <div className="text-xs text-slate-400">
              Planned: NetworkStatusCard
            </div>
          </Card>
        </div>
      </div>
    </LayoutShell>
  );
}
