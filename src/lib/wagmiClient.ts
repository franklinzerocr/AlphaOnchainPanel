// src/lib/wagmiClient.ts
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const connectors = [
  injected(),
  ...(projectId ? [walletConnect({ projectId })] : []),
];

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  connectors,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
