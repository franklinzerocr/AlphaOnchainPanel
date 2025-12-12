import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),

      // Dependencias opcionales de wagmi/connectors que NO usas
      "@walletconnect/ethereum-provider": false,
      "@coinbase/wallet-sdk": false,
      "@metamask/sdk": false,
      "@gemini-wallet/core": false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      "@base-org/account": false,

      // Porto (arrastrado indirectamente)
      "porto": false,
      "porto/internal": false,

      // React Native storage (traído por algunos SDKs)
      "@react-native-async-storage/async-storage": false,
    };

    return config;
  },
};

export default nextConfig;
