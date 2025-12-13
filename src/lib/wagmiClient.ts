// src/lib/wagmiClient.ts
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

/**
 * RPC URLs
 * Must be defined via env vars.
 * Fallbacks are explicit chain defaults (NOT thirdweb).
 */
const SEPOLIA_RPC_URL =
  process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ??
  sepolia.rpcUrls.default.http[0];

const MAINNET_RPC_URL =
  process.env.NEXT_PUBLIC_MAINNET_RPC_URL ??
  mainnet.rpcUrls.default.http[0];

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(SEPOLIA_RPC_URL),
    [mainnet.id]: http(MAINNET_RPC_URL),
  },
});
