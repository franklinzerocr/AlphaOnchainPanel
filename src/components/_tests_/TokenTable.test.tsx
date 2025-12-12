import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TokenTable } from "@/components/TokenTable";

describe("TokenTable", () => {
  it("renders rows", () => {
    render(
      <TokenTable
        rows={[
          { symbol: "ETH", name: "Ether", decimals: 18, amount: 1n },
          { symbol: "USDC", name: "USD Coin", decimals: 6, amount: 1000000n, usdHint: 1 },
        ]}
      />
    );

    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();
  });
});
