import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useNetworkMode", () => ({
  useNetworkMode: () => ({
    mode: "testnet",
    setMode: vi.fn(),
    mainnetAllowed: false,
  }),
}));

import { NetworkModeToggle } from "@/components/NetworkModeToggle";

describe("NetworkModeToggle", () => {
  it("renders", () => {
    render(<NetworkModeToggle />);
    expect(screen.getByText("Testnet")).toBeInTheDocument();
    expect(screen.getByText("Mainnet")).toBeInTheDocument();
  });
});
