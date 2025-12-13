// src/lib/wagmiClient.ts
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const sepoliaRpc = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
// Opcional: mainnetRpc
const mainnetRpc = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;

export const wagmiConfig = createConfig({
  chains: [sepolia, mainnet],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(sepoliaRpc),
    [mainnet.id]: http(mainnetRpc),
  },
});
