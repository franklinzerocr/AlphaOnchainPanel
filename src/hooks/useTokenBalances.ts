"use client";

import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useAccount, useBalance, useChainId, useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { SEPOLIA_TOKENS } from "@/lib/tokens";

export type TokenBalanceRow = {
  symbol: string;
  name: string;
  balance: string;   // human-readable
  usdValue: number;  // computed via usdHint
  pct: number;       // % of portfolio
};

function safeNum(n: unknown): number {
  const x = typeof n === "number" ? n : Number(n);
  return Number.isFinite(x) ? x : 0;
}

export function useTokenBalances() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const chainOk = chainId === sepolia.id;

  /* ---------------- ETH ---------------- */

  const eth = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });

  /* ---------------- ERC20 ---------------- */

  const erc20Tokens = useMemo(
    () => SEPOLIA_TOKENS.filter((t) => t.address),
    []
  );

  const contracts = useMemo(() => {
    if (!address) return [];
    return erc20Tokens.map((t) => ({
      abi: erc20Abi,
      address: t.address!,
      functionName: "balanceOf" as const,
      args: [address] as const,
    }));
  }, [address, erc20Tokens]);

  const reads = useReadContracts({
    contracts,
    query: {
      enabled: Boolean(address) && chainOk && contracts.length > 0,
    },
  });

  /* ---------------- ROWS (UI-READY) ---------------- */

  const rows: TokenBalanceRow[] = useMemo(() => {
    const out: TokenBalanceRow[] = [];

    // ETH row
    const ethAmount = eth.data?.value ?? 0n;
    const ethBalance = formatUnits(ethAmount, 18);

    out.push({
      symbol: "ETH",
      name: "Ether",
      balance: ethBalance,
      usdValue: 0, // no price feed yet
      pct: 0,
    });

    // ERC20 rows
    for (let i = 0; i < erc20Tokens.length; i++) {
      const t = erc20Tokens[i];
      const r = reads.data?.[i];
      const raw = r?.status === "success" ? (r.result as bigint) : 0n;

      const balance = formatUnits(raw, t.decimals);
      const usdHint = safeNum(t.usdHint);
      const usdValue = usdHint > 0 ? safeNum(balance) * usdHint : 0;

      out.push({
        symbol: t.symbol,
        name: t.name,
        balance,
        usdValue,
        pct: 0,
      });
    }

    // Percentages
    const total = out.reduce((acc, r) => acc + r.usdValue, 0);
    if (total > 0) {
      for (const r of out) {
        r.pct = (r.usdValue / total) * 100;
      }
    }

    return out;
  }, [eth.data?.value, erc20Tokens, reads.data]);

  /* ---------------- META ---------------- */

  const isLoading =
    Boolean(address) && (eth.isLoading || (chainOk && reads.isLoading));

  const error = eth.error ?? reads.error ?? null;

  const refetch = async () => {
    await Promise.all([
      eth.refetch?.(),
      chainOk ? reads.refetch?.() : Promise.resolve(),
    ]);
  };

  return {
    isConnected,
    chainOk,
    isLoading,
    error,
    rows,
    refetch,
  };
}
