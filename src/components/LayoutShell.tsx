"use client";

import React from "react";
import { NetworkModeToggle } from "@/components/NetworkModeToggle";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight">
              AlphaOnchain Panel
            </div>
            <div className="text-xs text-slate-400">
              Minimal Web3 ops dashboard (balances, status, swap)
            </div>
          </div>

          <div className="shrink-0">
            <NetworkModeToggle />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
