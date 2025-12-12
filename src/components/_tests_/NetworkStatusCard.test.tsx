import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("wagmi", async () => {
  return {
    useChainId: () => 11155111,
    usePublicClient: () => ({ getChainId: vi.fn().mockResolvedValue(11155111) }),
    useBlockNumber: () => ({ isLoading: false, data: 123n, error: null }),
    useGasPrice: () => ({ isLoading: false, data: 1000000000n, error: null }), // 1 gwei
  };
});

import { NetworkStatusCard } from "@/components/NetworkStatusCard";

describe("NetworkStatusCard", () => {
  it("renders core fields", () => {
    render(<NetworkStatusCard />);
    expect(screen.getByText("Chain ID")).toBeInTheDocument();
    expect(screen.getByText("RPC health")).toBeInTheDocument();
    expect(screen.getByText("Block")).toBeInTheDocument();
    expect(screen.getByText("Gas price")).toBeInTheDocument();
  });
});
