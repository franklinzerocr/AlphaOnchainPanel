"use client";

import { useMemo, useState } from "react";
import { useChainId } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export type NetworkMode = "testnet" | "mainnet";

const enableMainnet =
  (process.env.NEXT_PUBLIC_ENABLE_MAINNET || "").toLowerCase() === "true";

export function useNetworkMode() {
  const chainId = useChainId();

  const [mode, setMode] = useState<NetworkMode>("testnet");

  const isSepolia = chainId === sepolia.id;
  const isMainnet = chainId === mainnet.id;

  const mainnetAllowed = enableMainnet;

  const effectiveMode = useMemo<NetworkMode>(() => {
    // If mainnet not allowed, force testnet mode.
    if (mode === "mainnet" && !mainnetAllowed) return "testnet";
    return mode;
  }, [mode, mainnetAllowed]);

  return {
    mode: effectiveMode,
    setMode,
    mainnetAllowed,
    chainId,
    isSepolia,
    isMainnet,
  };
}
