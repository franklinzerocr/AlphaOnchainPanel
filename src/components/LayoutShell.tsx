"use client";

import React from "react";
import { NetworkModeToggle } from "@/components/NetworkModeToggle";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="web3-bg min-h-dvh">
      <div className="noise" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-8">
        <header className="mb-7 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="floaty inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl">
                <span className="text-sm font-semibold">α</span>
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight">
                  AlphaOnchain Panel
                </div>
                <div className="text-xs text-slate-400">
                  Web3 ops dashboard • balances • status • swap
                </div>
              </div>
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
