"use client";

import { useMemo, useState } from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useWriteContract,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import {
  UNISWAP_V2_SEPOLIA,
  uniswapV2FactoryAbi,
  uniswapV2RouterAbi,
} from "@/lib/uniswapV2";
import { useNetworkMode } from "@/hooks/useNetworkMode";

type SwapState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "ready"; quoteOut?: bigint; minOut?: bigint }
  | { status: "pending"; hash: `0x${string}` }
  | { status: "success"; hash: `0x${string}` }
  | { status: "error"; message: string };

function getErrorMessage(e: unknown): string {
  if (!e) return "Unknown error.";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;

  if (typeof e === "object") {
    const maybe = e as { message?: unknown; shortMessage?: unknown };
    if (typeof maybe.shortMessage === "string" && maybe.shortMessage.length > 0)
      return maybe.shortMessage;
    if (typeof maybe.message === "string" && maybe.message.length > 0)
      return maybe.message;
  }

  return "Unknown error.";
}

export function useSwap() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { mode } = useNetworkMode();

  const [amountEth, setAmountEth] = useState<string>("");
  const [state, setState] = useState<SwapState>({ status: "idle" });

  const chainOk = chainId === sepolia.id;

  const path = useMemo(
    () => [UNISWAP_V2_SEPOLIA.weth, UNISWAP_V2_SEPOLIA.usdc] as const,
    []
  );

  function guardOrSetError(): boolean {
    if (!publicClient) {
      setState({ status: "error", message: "RPC client not available." });
      return false;
    }
    if (!isConnected || !address) {
      setState({ status: "error", message: "Connect wallet first." });
      return false;
    }
    if (mode !== "testnet") {
      setState({
        status: "error",
        message:
          "Swap is disabled in Mainnet mode. Switch to Testnet to use Sepolia swap.",
      });
      return false;
    }
    if (!chainOk) {
      setState({ status: "error", message: "Switch your wallet to Sepolia." });
      return false;
    }
    return true;
  }

  function parseAmountOrSetError(): bigint | null {
    try {
      const value = parseEther(amountEth || "0");
      if (value <= 0n) throw new Error("Amount must be > 0");
      return value;
    } catch {
      setState({ status: "error", message: "Invalid ETH amount." });
      return null;
    }
  }

  async function quote() {
    if (!guardOrSetError()) return;

    const value = parseAmountOrSetError();
    if (value === null) return;

    setState({ status: "checking" });

    try {
      const pair = await publicClient!.readContract({
        abi: uniswapV2FactoryAbi,
        address: UNISWAP_V2_SEPOLIA.factory,
        functionName: "getPair",
        args: [UNISWAP_V2_SEPOLIA.weth, UNISWAP_V2_SEPOLIA.usdc],
      });

      if (
        !pair ||
        pair === "0x0000000000000000000000000000000000000000"
      ) {
        setState({
          status: "error",
          message:
            "No WETH/USDC pool found on Sepolia Uniswap V2. (Demo guardrail: swap disabled until liquidity exists.)",
        });
        return;
      }

      const amounts = await publicClient!.readContract({
        abi: uniswapV2RouterAbi,
        address: UNISWAP_V2_SEPOLIA.router,
        functionName: "getAmountsOut",
        args: [value, [...path]],
      });

      const out = (amounts as readonly bigint[])[1];
      const minOut = (out * 99n) / 100n; // fixed 1% slippage

      setState({ status: "ready", quoteOut: out, minOut });
    } catch (e: unknown) {
      setState({ status: "error", message: getErrorMessage(e) || "Quote failed." });
    }
  }

  async function swap() {
    if (!guardOrSetError()) return;

    const value = parseAmountOrSetError();
    if (value === null) return;

    if (state.status !== "ready" || state.minOut === undefined) {
      setState({ status: "error", message: "Get a quote first." });
      return;
    }

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 10);

    try {
      const hash = await writeContractAsync({
        abi: uniswapV2RouterAbi,
        address: UNISWAP_V2_SEPOLIA.router,
        functionName: "swapExactETHForTokens",
        args: [state.minOut, [...path], address!, deadline],
        value,
      });

      setState({ status: "pending", hash });

      await publicClient!.waitForTransactionReceipt({ hash });
      setState({ status: "success", hash });
    } catch (e: unknown) {
      setState({ status: "error", message: getErrorMessage(e) || "Swap failed." });
    }
  }

  return {
    mode,
    chainOk,
    isConnected,
    amountEth,
    setAmountEth,
    state,
    quote,
    swap,
  };
}
