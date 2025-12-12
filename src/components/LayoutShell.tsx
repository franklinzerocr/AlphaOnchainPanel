// src/components/LayoutShell.tsx
import React from "react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold tracking-tight">
              AlphaOnchain Panel
            </span>
            <span className="text-xs text-slate-400">
              Minimal Web3 ops dashboard
            </span>
          </div>
          <div className="text-xs text-slate-500">Sepolia • Mainnet</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">
        Built with Next.js • TypeScript • Wagmi • viem
      </footer>
    </div>
  );
}
