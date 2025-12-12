import { describe, it, expect } from "vitest";
import { formatTokenAmount } from "@/lib/format";

describe("formatTokenAmount", () => {
  it("formats bigint with decimals", () => {
    expect(formatTokenAmount(123450000n, 6, 2)).toBe("123.45");
  });

  it("handles undefined", () => {
    expect(formatTokenAmount(undefined, 18)).toBe("—");
  });
});
