import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("wagmi", async () => {
  return {
    useChainId: () => 11155111,
    usePublicClient: () => ({
      getChainId: vi.fn().mockResolvedValue(11155111),
    }),
    useBlockNumber: () => ({
      isLoading: false,
      data: 123n,
      error: null,
    }),
    useGasPrice: () => ({
      isLoading: false,
      data: 1000000000n, // 1 gwei
      error: null,
    }),
  };
});

import { NetworkStatusCard } from "@/components/NetworkStatusCard";

describe("NetworkStatusCard", () => {
  it("renders core fields", async () => {
    render(<NetworkStatusCard />);

    expect(await screen.findByText("Chain ID")).toBeInTheDocument();
    expect(await screen.findByText("RPC health")).toBeInTheDocument();
    expect(await screen.findByText("Block")).toBeInTheDocument();
    expect(await screen.findByText("Gas price")).toBeInTheDocument();
  });
});
