import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useIsClient", () => ({
  useIsClient: () => true,
}));

vi.mock("@/hooks/useSwap", () => ({
  useSwap: () => ({
    amountEth: "",
    setAmountEth: vi.fn(),
    state: { status: "idle" },
    quote: vi.fn(),
    swap: vi.fn(),
    isConnected: false,
    chainOk: false,
    mode: "testnet",
  }),
}));

import { SwapPanel } from "@/components/SwapPanel";

describe("SwapPanel", () => {
  it("renders buttons", () => {
    render(<SwapPanel />);
    expect(screen.getByText("Get Quote")).toBeInTheDocument();
    expect(screen.getByText("Swap to USDC")).toBeInTheDocument();
  });
});
