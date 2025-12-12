// src/hooks/useTokenBalances.ts
"use client";

import { useMemo } from "react";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useChainId, useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { SEPOLIA_TOKENS } from "@/lib/tokens";

export type TokenBalanceRow = {
  symbol: string;
  name: string;
  decimals: number;
  address?: `0x${string}`;
  amount?: bigint;
  // MVP: USD only for stablecoins (usdHint=1). ETH pricing comes later.
  usdHint?: number;
};

export function useTokenBalances() {
  const { address } = useAccount();
  const chainId = useChainId();

  const enabled = Boolean(address) && chainId === sepolia.id;

  const eth = useBalance({
    address,
    query: { enabled },
  });

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
    query: { enabled: enabled && contracts.length > 0 },
  });

  const rows: TokenBalanceRow[] = useMemo(() => {
    const base: TokenBalanceRow[] = [
      {
        symbol: "ETH",
        name: "Ether",
        decimals: 18,
        amount: eth.data?.value,
      },
      ...erc20Tokens.map((t, idx) => {
        const r = reads.data?.[idx];
        const amount = r?.status === "success" ? (r.result as bigint) : undefined;
        return {
          symbol: t.symbol,
          name: t.name,
          decimals: t.decimals,
          address: t.address,
          amount,
          usdHint: t.usdHint,
        };
      }),
    ];
    return base;
  }, [erc20Tokens, reads.data, eth.data?.value]);

  return {
    enabled,
    chainOk: chainId === sepolia.id,
    isLoading: enabled && (eth.isLoading || reads.isLoading),
    error: eth.error ?? reads.error,
    rows,
  };
}
