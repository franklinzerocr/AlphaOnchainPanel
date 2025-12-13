import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TokenTable } from "@/components/TokenTable";
import type { TokenBalanceRow } from "@/hooks/useTokenBalances";

describe("TokenTable", () => {
  it("renders rows", () => {
    const rows: TokenBalanceRow[] = [
      {
        symbol: "ETH",
        name: "Ether",
        balance: "1.25",
        usdValue: 3750,
        pct: 60,
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: "1500",
        usdValue: 1500,
        pct: 24,
      },
    ];

    render(<TokenTable rows={rows} />);

    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();

    expect(screen.getByText("1.25")).toBeInTheDocument();
    expect(screen.getByText("$3750.00")).toBeInTheDocument();
    expect(screen.getByText("60.00%")).toBeInTheDocument();
  });
});
