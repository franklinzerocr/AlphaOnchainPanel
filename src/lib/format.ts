// src/lib/format.ts
import { formatUnits } from "viem";

export function formatTokenAmount(
  value: bigint | undefined,
  decimals: number,
  maxFrac = 6
) {
  if (value === undefined) return "—";
  const s = formatUnits(value, decimals);
  const [i, f = ""] = s.split(".");
  if (!f) return i;
  return `${i}.${f.slice(0, maxFrac)}`.replace(/\.$/, "");
}
