# AlphaOnchain Panel

<p align="center">

A minimal Web3 operations dashboard focused on wallet connectivity, on-chain data, and clean operational UI.

</p>

<p align="center">
 
<img src="https://github.com/franklinzerocr/alphaonchainpanel/actions/workflows/ci.yml/badge.svg?branch=main" />
<img src="https://img.shields.io/badge/Next.js-15-black" />
<img src="https://img.shields.io/badge/TypeScript-strict-blue" />
<img src="https://img.shields.io/badge/Wagmi-2.x-purple" />
<img src="https://img.shields.io/badge/Viem-2.x-green" />
<img src="https://img.shields.io/badge/TailwindCSS-3.x-cyan" />
<img src="https://img.shields.io/badge/Tests-Vitest-success" />

</p>

---

## Screenshots

![dashboard1](docs/dashboard1.PNG)
![dashboard2](docs/dashboard2.PNG)

---

## Features

- Wallet connection via injected providers (MetaMask-compatible)

- ETH and ERC20 on-chain balance tracking

- Portfolio overview with allocation chart

- Network status monitoring (block number, gas, RPC health)

- ETH → USDC swap on Sepolia testnet

- Automatic demo portfolio when wallet has no funds

- Clear separation between UI, hooks, and Web3 logic

- Unit tests and CI validation

---

## Architecture
src/\
├── components/ # Presentational UI components\
├── hooks/ # Web3 logic and state\
├── lib/ # Static configs and demo data\
├── styles/ # Global styling\
└── app/ # Next.js App Router

Key principles:

- Hooks own Web3 concerns

- Components consume normalized, UI-ready data

- Demo data never mixes with real balances

- Testnet and mainnet behavior is explicit

---

## Tech Stack

- Next.js 15 (App Router)

- TypeScript (strict)

- Wagmi + Viem

- Tailwind CSS

- Recharts

- Vitest

---

## Local Development

```bash

git clone https://github.com/franklinzerocr/alphaonchainpanel.git

cd alphaonchainpanel

npm install

npm run dev
```
Runs at `http://localhost:3000`.

* * * * *

Environment Variables
---------------------

The project runs without secrets by default.

Optional RPC override:
NEXT_PUBLIC_RPC_URL=

