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
  usdHint?: number;
};

export function useTokenBalances() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const chainOk = chainId === sepolia.id;

  // ETH should load on any chain when connected
  const eth = useBalance({
    address,
    query: { enabled: Boolean(address) },
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

  // ERC20 reads only on Sepolia (because addresses are Sepolia)
  const reads = useReadContracts({
    contracts,
    query: { enabled: Boolean(address) && chainOk && contracts.length > 0 },
  });

  const rows: TokenBalanceRow[] = useMemo(() => {
    const ethRow: TokenBalanceRow = {
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      amount: eth.data?.value,
    };

    const tokenRows: TokenBalanceRow[] = erc20Tokens.map((t, idx) => {
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
    });

    return [ethRow, ...tokenRows];
  }, [erc20Tokens, reads.data, eth.data?.value]);

  return {
    isConnected,
    address,
    chainOk,
    isLoading: Boolean(address) && (eth.isLoading || (chainOk && reads.isLoading)),
    error: eth.error ?? reads.error,
    rows,
    refetch: async () => {
      await Promise.all([
        eth.refetch?.(),
        chainOk ? reads.refetch?.() : Promise.resolve(),
      ]);
    },
  };
}
