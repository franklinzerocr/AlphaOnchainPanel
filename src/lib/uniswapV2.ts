// src/lib/uniswapV2.ts
export const UNISWAP_V2_SEPOLIA = {
  router: "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3" as const, // Uniswap docs
  factory: "0xF62c03E08ada871A0bEb309762E260a7a6a880E6" as const, // Uniswap docs
  weth: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14" as const, // WETH9 Sepolia
  usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as const, // Circle USDC Sepolia
};

export const uniswapV2RouterAbi = [
  {
    name: "getAmountsOut",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    name: "swapExactETHForTokens",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
] as const;

export const uniswapV2FactoryAbi = [
  {
    name: "getPair",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
    ],
    outputs: [{ name: "pair", type: "address" }],
  },
] as const;
